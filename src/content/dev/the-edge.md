---
title: "The Edge"
subtitle: "What's the edge, why do we need it and can we build it?"
date: 2023-05-17
draft: true
description: "The Edge: What's the edge why do we need it and can we build it?"
tags:
    - edge
    - serverless
    - cloud
    - basics
id: 01H0KHPGS68FMSG4D6XG7TEHXE
---

## What the fuck is the edge?

A term thrown around a lot in various twitter threads [], the edge according to infrastructure experts [], is services closer to users. Applications that gained traction initially with the edge revolved around 5G, smart cities, IoT and other such paradigms. These are services that benefit from doing data processing closer to users. Think of a dystopian nightmare CCTV camera [https://www.met.police.uk/advice/advice-and-information/fr/facial-recognition-technology/]. If you wanted to do facial recognision for every person that walked past, you would traditionally funnel all that data to some central data center and run all of your processing there. For 4-5.9 million [] cameras that could be a hell of a lot of bandwidth being used. What if, the edge so kindly asks, you did processing closer. Facial recognision doesn't need a supercomputer anymore [], so lets run it on a Raspberry Pi. And lets put one, for arguments sake, next to every 20 cameras, give or take. Now you're processing on the edge. From this explaination it seems to me that it's a bandwidth(*time travelled)/computing cost tradeoff.

## This has nothing to do with Vercel or Next.js I'm clicking the back button

Theo [] very aptly puts it, in his video on renaming the edge. Edge functions, depending on usecase can be making the wrong tradeoff here. In short, moving a function that makes 10 calls to a DB closer to a user that makes 2 calls to a function, is the wrong tradeoff. Here the time travelled is higher, and depending on the DB calls so is the bandwidth (you're probably not sending everything back to the user right?). The edge is a paradigm of the most effective way to utilise resource, it's not 'move everything closer to the users' necessarily. It's 'move the things that make sense closer to the users'. In the CCTV example the cameras are the users.

## This still has nothing to do with serving my SaaS app™

Interestingly, the web has been doing edge for a while. CDN's and caching have been putting static stuff [] closer to users since the 90s. Because it made it faster (time travelled), and static file servers we're cheap (computing cost). This probably made the web what it is today, because lest we forget, 1gbit to the door broadband didn't exist just a few years ago. CDNs aren't without their caveats. There aren't any one person CDN startups, because scale matters here and you need to be able to serve a lot of users to make it cost effective. Then came serverless

## Serverl̶e̶s̶s̶ful

"Serverless is someone elses server"

The growth of serverless starting somewhere in the late 2000s [] introduced a new way of executing code. Rather than looking at it as someone else's server imagine it as packing more people into fewer cars []. Utilising computing resources on demand rather than your Wordpress blog server sitting around doing a lot of nothing, thereby reducing computing cost. This is the introduction of event driven computing, where resource is provisioned based on events occuring. This gave rise to services that run and manage your docker containers, k8s clusters, and even functions as a service. 

## is functions as a service the edge?

No.
I like Astro [] so I'm going to ignore all other web frameworks for a bit. I tend to use Astro in it's SSR mode. This means that when I run `npm run build`, depending on my adapter [], astro spits out a function that gracefully handles routing and rendering the bits of my code that I want rendered on the client. This function, if I was using the `node.js` adapter for example can be popped into an express server, and deployed as an express server. I could host this on a VPS but if I was bored I could write a dockerfile, and use GCP's Cloud Run [], or something like that. My container will be spun up when a request comes in and if lots of requests come in, more containers can be spun up to help more people play with shaders []. The big problem with this is cold starts, which is the time it takes for a new container to be spun up. This can be managed by using warm containers and pre-warmed containers etc. but this defeats the purpose of paying someone else to manage your server. But more to the point, this is an increase in computing cost, because unfortunatly the cold starts have to be paid for. So functions! Functions reduce the management layer further. In order to achieve this functions need to be able to stop and start seamlessly so cold starts don't have to be worried about. If we go back to the Astro bit, wouldn't it be nice if I could just give someone my function to run, and they run it everytime a request is made? And maybe like CDNs they could run loads of people's functions, so it's cheaper. This is the goal of Functions as a Service. And better yet, like CDNs, they could even run my functions closer to users (if it's suitable). edge.

## ah cool, so how?

So this is where it all feels a bit hazy. Running arbitrary code everywhere is hard and I think a lot of people are making a lot of money doing it well. Hopefully it's a slim moat so we see open source soon quickly 