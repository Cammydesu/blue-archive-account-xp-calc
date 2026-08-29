<h1>Blue Archive Account Experience Calculator</h1>

A Blue Archive tool that predicts when you will hit a certain level based on user input. It attempts to predict down to the exact day, but can be inaccurate due to 2x experience events in the real game.

<h1>Why this project exists</h1>

I created this project as a simple, first website that was originally written as a C++ terminal app and then translated into JavaScript as a learning experience. This project was
heavily inspired by Futottakakka's [sensei.lol](https://sensei.lol/#sensei), with the difference
that my calculator uses a simulator to more accurately calculate days and estimated end date.

<h1>Calculation Breakdown</h1>

<h4>(50 AP is added to daily AP in the actual calculations for simplification)</h4>

- Daily AP
  - 24 hour generation (6 per hour, 240 per day)
  - Club check-in (10 per day)
  - Daily pack (10 per day)
  - Cafe AP (Up to 739 per day)
  - Daily tasks (150 per day)
  - Pyroxene refreshes (120 per refresh, up to 2400 per day)
  - Tactical challenge refreshes (90 per refresh, up to 360 per day)
- Weekly AP
  - Multiplies daily AP by 7
  - Adds 350 AP for weekly tasks

Pyroxenes and Tactical Challenge coins are calculated based on how many you input.

<h1>Trademark Disclaimer</h1>

This website is a non-commercial, player tool made for the game Blue Archive. I am in no way affiliated, endorsed by, or\
associated with **NEXON Korea Corp., NEXON GAMES Co., Ltd., or Yostar Co., Ltd.** These names are utilized here strictly under [**Nominative Fair Use**](https://en.wikipedia.org/wiki/Nominative_use) to describe the utility and compatibility of this software, in compliance with the [Nexon Game IP Guide for Content Creators](https://playersupport.nexon.com/hc/en-us/articles/360059079812-Nexon-Game-IP-Guide-for-Content-Creators).
