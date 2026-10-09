> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/glossary.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/glossary.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 术语表

这是一份由社区创建的术语表,欢迎贡献力量!

- **Deep Q-Learning(深度 Q 学习):** 一种价值型(value-based)深度强化学习算法,使用深度神经网络来近似给定状态下各个动作的 Q 值。深度 Q 学习的目标是通过学习动作价值,找到能够最大化期望累积奖励的最优策略。

- **价值方法:** 这类强化学习方法先估计一个价值函数,并以此作为寻找最优策略的中间步骤。

- **策略方法:** 这类强化学习方法直接学习逼近最优策略,而不学习价值函数。实践中,它们输出的是动作上的概率分布。

    相比价值方法,使用策略梯度方法的好处包括:
    - 易于集成:无需存储动作价值;
    - 能够学习随机策略:智能体(agent)在探索状态空间时不会总是走同一条轨迹,从而避免了感知混叠(perceptual aliasing)问题;
    - 在高维动作空间和连续动作空间中更有效;
    - 收敛性质更好。

- **策略梯度:** 策略方法的一个子集,其目标是通过梯度上升最大化参数化策略的性能。策略梯度的目标是:通过调整策略来控制动作的概率分布,让好的动作(即能最大化回报的动作)在未来被更频繁地采样。

- **Monte Carlo Reinforce(蒙特卡洛 REINFORCE):** 一种策略梯度算法,使用从整个回合估计出的回报来更新策略参数。

如果你想帮助改进这门课程,可以[提交 Pull Request。](https://github.com/huggingface/deep-rl-class/pulls)

本术语表离不开以下贡献者的帮助:

- [Diego Carpintero](https://github.com/dcarpintero)
