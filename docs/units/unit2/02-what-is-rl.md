> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/what-is-rl.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/what-is-rl.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 什么是强化学习?简要回顾

在强化学习(Reinforcement Learning,RL)中,我们构建能够**做出明智决策**的智能体(agent)。比如,一个**学会玩电子游戏**的智能体;或者一个通过决定**买哪些股票、何时卖出**来**学会最大化收益**的交易智能体。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/rl-process.jpg" alt="强化学习过程"/>


为了做出智能的决策,我们的智能体会向环境学习:**通过反复试错(trial and error)与环境交互**,并把获得的奖励(reward,有正有负)**作为唯一的反馈。**

它的目标**是最大化期望累积奖励(expected cumulative reward)**(其依据是奖励假设,reward hypothesis)。

**智能体的决策过程称为策略(policy)π:** 给定一个状态(state),策略会输出一个动作(action),或者动作上的一个概率分布。也就是说,给定对环境的观测,策略会提供智能体应当采取的动作(或每个动作各自的概率)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/policy.jpg" alt="策略"/>

**我们的目标是找到最优策略 π\* **,也就是能带来最佳期望累积奖励的策略。

而要找到这个最优策略(从而解决 RL 问题),**主要有两类 RL 方法**:

- *基于策略的方法(policy-based methods)*:**直接训练策略**,让它学会在给定状态时采取什么动作。
- *价值方法(value-based methods)*:**训练一个价值函数(value function)**,让它学会**哪个状态更有价值**,并利用这个价值函数**来采取能通向该状态的动作。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/two-approaches.jpg" alt="两种 RL 方法"/>

而在本单元中,**我们将深入探讨价值方法。**
