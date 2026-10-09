> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/rl-framework.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/rl-framework.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 强化学习框架

## 强化学习流程

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/RL_process.jpg" alt="强化学习流程" width="100%">
<figcaption>强化学习流程:状态、动作、奖励和下一个状态构成的循环</figcaption>
<figcaption>来源:<a href="http://incompleteideas.net/book/RLbook2020.pdf">Richard Sutton 和 Andrew G. Barto 著《Reinforcement Learning: An Introduction》</a></figcaption>
</figure>

要理解强化学习流程,让我们想象一个智能体在学习玩平台跳跃游戏:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/RL_process_game.jpg" alt="强化学习流程" width="100%">

- 我们的智能体从**环境**接收**状态 \(S_0\)**——也就是我们收到游戏(环境)的第一帧画面。
- 基于**状态 \(S_0\)**,智能体采取**动作 \(A_0\)**——我们的智能体会向右移动。
- 环境进入**新的状态 \(S_1\)**——新的一帧画面。
- 环境给智能体一些**奖励 \(R_1\)**——我们没有死*(正向奖励 +1)*。

这个强化学习循环输出一个由**状态、动作、奖励和下一个状态**组成的序列。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/sars.jpg" alt="状态、动作、奖励、下一个状态" width="100%">

智能体的目标是*最大化*它的累积奖励,这被称为**期望回报(expected return)**。

## 奖励假说:强化学习的核心思想

⇒ 为什么智能体的目标是最大化期望回报?

因为强化学习建立在**奖励假说(reward hypothesis)**之上,即所有目标都可以描述为**最大化期望回报**(期望的累积奖励)。

这就是为什么在强化学习中,**为了获得最佳行为**,我们的目标是学会采取**能最大化期望累积奖励的动作**。


## 马尔可夫性(Markov Property)

在论文中,你会看到强化学习流程被称为**马尔可夫决策过程**(Markov Decision Process,MDP)。

我们会在后续单元中再次讨论马尔可夫性。但如果你今天只需要记住一件事,那就是:马尔可夫性意味着我们的智能体**只需要当前状态**就能决定采取什么动作,**而不需要之前所有状态和动作的历史记录**。

## 观测/状态空间

观测/状态是**我们的智能体从环境中获得的信息。**以电子游戏为例,它可以是一帧画面(一张截图)。以交易智能体为例,它可以是某只股票的价格,等等。

不过,我们需要对*观测(observation)*和*状态(state)*加以区分:

- *状态 s*:是**对世界状态的完整描述**(没有隐藏信息),存在于完全可观测的环境中。


<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/chess.jpg" alt="国际象棋">
<figcaption>在国际象棋游戏中,我们可以获取整个棋盘的信息,因此我们从环境接收的是状态。</figcaption>
</figure>

在国际象棋游戏中,我们可以获取整个棋盘的信息,所以我们从环境接收的是状态。换句话说,这个环境是完全可观测的。

- *观测 o*:是**对状态的部分描述**,存在于部分可观测的环境中。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/mario.jpg" alt="Super Mario Bros">
<figcaption>在 Super Mario Bros(超级马力欧兄弟)中,我们只能看到关卡中靠近玩家的部分,所以我们接收的是观测。</figcaption>
</figure>

在 Super Mario Bros 中,我们只能看到关卡中靠近玩家的那一部分,因此我们接收的是观测。

在 Super Mario Bros 中,我们处于一个部分可观测的环境中。我们接收的是观测,**因为我们只能看到关卡的一部分。**

!!! tip
    在本课程中,我们用"状态"一词来统称状态和观测,但在具体实现中我们会做出区分。

总结一下:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/obs_space_recap.jpg" alt="观测空间总结" width="100%">


## 动作空间

动作空间是**环境中所有可能动作的集合。**

动作可以来自*离散空间*或*连续空间*:

- *离散空间*:可能的动作数量是**有限的**。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/mario.jpg" alt="Super Mario Bros">
<figcaption>在 Super Mario Bros 中,我们只有 4 种可能的动作:左、右、上(跳跃)和下(蹲下)。</figcaption>

</figure>

再以 Super Mario Bros 为例,我们拥有的动作集合是有限的,因为只有 4 个方向。

- *连续空间*:可能的动作数量是**无限的**。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/self_driving_car.jpg" alt="自动驾驶汽车">
<figcaption>自动驾驶汽车智能体有无限多个可能的动作,因为它可以左转 20°、21.1°、21.2°,按喇叭,右转 20°……
</figcaption>
</figure>

总结一下:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/action_space.jpg" alt="动作空间总结" width="100%">

把这些信息考虑在内至关重要,因为它们**在将来选择强化学习算法时会非常重要。**

## 奖励与折扣

奖励在强化学习中至关重要,因为它是智能体的**唯一反馈**。多亏了它,我们的智能体才能知道**所采取的动作是好还是不好。**

每个时间步 **t** 的累积奖励可以写作:

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/rewards_1.jpg" alt="奖励">
<figcaption>累积奖励等于序列中所有奖励之和。
</figcaption>
</figure>

这等价于:

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/rewards_2.jpg" alt="奖励">
<figcaption>累积奖励 = rt+1 (rt+k+1 = rt+0+1 = rt+1)+ rt+2 (rt+k+1 = rt+1+1 = rt+2) + ...
</figcaption>
</figure>

然而,在现实中,**我们不能就这样直接把它们相加。**越早到来的奖励(游戏开始阶段的奖励)**越有可能发生**,因为它们比长期未来的奖励更可预测。

假设你的智能体是一只小老鼠,每个时间步可以移动一格,而你的对手是猫(它也会移动)。老鼠的目标是**在被猫吃掉之前,吃到尽可能多的奶酪。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/rewards_3.jpg" alt="奖励" width="100%">

从图中可以看到,**吃掉我们附近的奶酪,比吃掉靠近猫的奶酪概率更大**(我们离猫越近,就越危险)。

因此,**靠近猫的奖励,即使更大(奶酪更多),也会被更大程度地折扣**,因为我们并不能确定自己一定能吃到它。

要对奖励进行折扣,我们这样做:

1. 我们定义一个折扣率,称为 gamma。**它必须介于 0 和 1 之间。**大多数情况下在 **0.95 到 0.99** 之间。
- gamma 越大,折扣越小。这意味着我们的智能体**更关心长期奖励。**
- 另一方面,gamma 越小,折扣越大。这意味着我们的**智能体更关心短期奖励(最近的奶酪)。**

2. 然后,每个奖励都会按 gamma 的时间步次幂进行折扣。随着时间步的增加,猫离我们越来越近,**未来的奖励也就越来越不可能发生。**

我们的折扣期望累积奖励是:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/rewards_4.jpg" alt="奖励" width="100%">
