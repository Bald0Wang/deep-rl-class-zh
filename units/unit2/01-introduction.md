> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Q-Learning 入门

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/thumbnail.jpg" alt="第 2 单元封面" width="100%">


在本课程的第一单元中,我们学习了强化学习(Reinforcement Learning,RL)、RL 的流程,以及解决 RL 问题的各种方法。我们还**训练了我们的第一批智能体(agent),并把它们上传到了 Hugging Face Hub。**

在本单元中,我们将**深入探讨强化学习方法中的一种:价值方法(value-based methods)**,并研究我们的第一个 RL 算法:**Q-Learning。**

我们还将**从零开始实现我们的第一个 RL 智能体**——一个 Q-Learning 智能体,并在两个环境中对它进行训练:

1. Frozen-Lake-v1(冰湖,不打滑版本):智能体需要**从起始状态(S)走到目标状态(G)**,只能踩在冰面格子(F)上,并避开洞穴(H)。
2. 自动驾驶出租车(Taxi):智能体需要**学会在城市中导航**,把乘客**从 A 点运送到 B 点。**


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/envs.gif" alt="环境"/>

具体来说,我们将:

- 学习**价值方法(value-based methods)**。
- 了解**蒙特卡洛方法(Monte Carlo)与时序差分学习(Temporal Difference Learning)之间的区别**。
- 研究并实现**我们的第一个 RL 算法**:Q-Learning。

如果你想上手 Deep Q-Learning,本单元是**必不可少的基础**:Deep Q-Learning 是第一个会玩 Atari 游戏、并在其中一些游戏(如 Breakout(打砖块)、Space Invaders(太空侵略者)等)上超越人类水平的深度强化学习算法。

那我们开始吧!🚀
