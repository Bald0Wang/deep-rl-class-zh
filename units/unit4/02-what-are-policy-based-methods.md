> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/what-are-policy-based-methods.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/what-are-policy-based-methods.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 什么是策略方法?

强化学习的主要目标是**找到能够使期望累积奖励(expected cumulative reward)最大化的最优策略 \\(\pi^{*}\\)**。
因为强化学习建立在*奖励假设*(reward hypothesis)之上:**一切目标都可以描述为期望累积奖励的最大化。**

举个例子,在一场足球比赛中(两个单元之后我们就会训练智能体踢球),目标是赢下比赛。我们可以用强化学习的语言把这个目标描述为:**最大化攻入对方球门的进球数**(当皮球越过球门线时),同时**最小化本方球门的失球数**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/soccer.jpg" alt="足球" />

## 价值方法、策略方法与 Actor-Critic 方法

在第一单元中,我们见过两种寻找(多数时候是逼近)最优策略 \\(\pi^{*}\\) 的方法。

- 在*价值方法*中,我们学习一个价值函数。
  - 其思想是:最优的价值函数能够导出最优策略 \\(\pi^{*}\\)。
  - 我们的目标是**最小化预测值与目标值之间的损失**,以此逼近真实的动作价值函数。
  - 我们也有策略,但它是隐式的,因为它**直接由价值函数生成**。例如在 Q-Learning 中,我们使用的是 (epsilon-)greedy 策略(ε-贪婪策略)。

- 而在*策略方法*中,我们直接学习逼近 \\(\pi^{*}\\),无须学习价值函数。
  - 其思想是**对策略进行参数化**。例如使用一个神经网络 \\(\pi_\theta\\),该策略会输出动作上的概率分布(随机策略)。
  - <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/stochastic_policy.png" alt="随机策略" />
  - 我们的目标是**通过梯度上升来最大化参数化策略的性能**。
  - 为此,我们要控制参数 \\(\theta\\),它会影响智能体在某个状态下的动作分布。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/policy_based.png" alt="策略方法" />

- 下一单元,我们将学习 *actor-critic* 方法,它是价值方法与策略方法的结合。

因此,借助策略方法,我们可以直接优化策略 \\(\pi_\theta\\),让它输出能带来最佳累积回报(return)的动作概率分布 \\(\pi_\theta(a|s)\\)。
为此,我们定义一个目标函数(objective function)\\(J(\theta)\\),也就是期望累积奖励,并且**要找到使这个目标函数最大化的 \\(\theta\\) 值**。

## 策略方法与策略梯度方法的区别

策略梯度方法(policy-gradient methods)——也就是本单元要研究的对象——是策略方法的一个子类。在策略方法中,优化大多是 *on-policy*(同策略)的,因为每次更新我们只使用**由最新版本的 \\(\pi_\theta\\)** 采集的数据(轨迹)。

这两种方法的区别**在于我们如何优化参数 \\(\theta\\)**:

- 在*策略方法*中,我们直接搜索最优策略。我们可以**间接**优化参数 \\(\theta\\):借助爬山法(hill climbing)、模拟退火(simulated annealing)或进化策略(evolution strategies)等技术,最大化目标函数的局部近似。
- 在*策略梯度方法*中,由于它是策略方法的子类,我们同样直接搜索最优策略。但我们会**直接**优化参数 \\(\theta\\):对目标函数 \\(J(\theta)\\) 的性能执行梯度上升。

在深入探讨策略梯度方法的工作原理(目标函数、策略梯度定理、梯度上升等)之前,我们先来研究策略方法的优点和缺点。
