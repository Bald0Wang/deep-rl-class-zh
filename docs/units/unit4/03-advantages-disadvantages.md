> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/advantages-disadvantages.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/advantages-disadvantages.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 策略梯度方法的优点与缺点

看到这里,你可能会问:"可是 Deep Q-Learning 已经很棒了啊,为什么还要用策略梯度方法?"为了回答这个问题,我们来研究一下**策略梯度方法的优点和缺点**。

## 优点

相比价值方法,策略梯度方法有诸多优势。下面来看其中几个:

### 易于集成

我们可以直接估计策略,无须额外存储数据(动作价值)。

### 策略梯度方法可以学习随机策略

策略梯度方法**能够学习随机策略(stochastic policy),而价值函数做不到**。

这带来两个好处:

1. 我们**无须手动实现探索/利用(exploration/exploitation)的权衡**。由于我们输出的是动作上的概率分布,智能体探索状态空间时**不会总是重复同一条轨迹。**

2. 我们也摆脱了**感知混叠(perceptual aliasing)**问题。感知混叠是指两个状态看起来(或实际上)相同,却需要采取不同动作的情况。

举个例子:假设我们有一台智能吸尘器,它的目标是吸走灰尘,同时避免弄死仓鼠。

<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/hamster1.jpg" alt="仓鼠 1"/>
</figure>

这台吸尘器只能感知墙的位置。

问题在于,**两个红色(着色)状态是相互混叠的状态,因为智能体在这两处感知到的都是上方和下方各有一面墙**。

<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/hamster2.jpg" alt="仓鼠 1"/>
</figure>

在确定性策略(deterministic policy)下,策略要么在红色状态时总是向右移动,要么总是向左移动。**无论哪种情况,我们的智能体都会卡住,永远吸不到灰尘**。

在基于价值的强化学习算法下,我们学到的是一个**准确定性策略**("epsilon 贪婪策略")。因此,我们的智能体可能**要花很长时间才能找到灰尘**。

相反,最优的随机策略**会在红色(着色)状态下随机地向左或向右移动**。这样一来,**它不会卡住,并能以很高的概率到达目标状态**。

<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/hamster3.jpg" alt="仓鼠 1"/>
</figure>

### 策略梯度方法在高维动作空间和连续动作空间中更加有效

Deep Q-Learning 的问题在于:给定当前状态,它**在每一个时间步都要为每种可能的动作预测一个分数(最大期望未来奖励)**。

可如果我们面对的是无穷多种可能的动作呢?

比如一辆自动驾驶汽车,在每个状态下你都有(近乎)无穷的动作选择(把方向盘转 15°、17.2°、19.4°,按喇叭,等等)。**我们需要为每一种可能的动作输出一个 Q 值**!而且**从一个连续输出中取最大动作,这本身就是个优化问题**!

而策略梯度方法则不同,我们输出的是**动作上的概率分布。**

### 策略梯度方法具有更好的收敛性质

在价值方法中,我们用一个激进的算子来**更新价值函数:我们对 Q 估计取最大值**。
因此,如果估计的动作价值发生了任意微小的变化,而这个变化恰好导致另一个动作成为最大值,那么动作概率就可能发生剧烈变化。

举个例子:假如在训练过程中,最优动作本来是向左(Q 值为 0.22),而下一步训练之后变成了向右(因为向右的 Q 值变成了 0.23),那么策略就发生了剧变——从此策略大多数时候会选向右,而不是向左。

相反,在策略梯度方法中,随机策略的动作偏好(采取某个动作的概率)**会随时间平滑地变化**。

## 缺点

当然,策略梯度方法也有一些缺点:

- **策略梯度方法经常收敛到局部最大值,而不是全局最优。**
- 策略梯度推进得较慢,**一步一步来:训练可能更耗时(效率不高)。**
- 策略梯度的方差可能很大。我们会在 actor-critic 单元中讲解原因,以及如何解决这个问题。

👉 如果你想更深入地了解策略梯度方法的优缺点,[可以观看这个视频](https://youtu.be/y3oqOjHilio)。
