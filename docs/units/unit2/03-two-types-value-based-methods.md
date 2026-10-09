> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/two-types-value-based-methods.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/two-types-value-based-methods.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 两种价值方法

在价值方法(value-based methods)中,**我们学习一个价值函数(value function)**,它**把一个状态(state)映射到处于该状态的期望价值。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/vbm-1.jpg" alt="价值方法"/>

一个状态的价值,是智能体(agent)**从这个状态出发、之后按照我们的策略(policy)行动**所能获得的**期望折扣回报(expected discounted return)**。

!!! tip
    可是,"按照我们的策略行动"究竟是什么意思?毕竟,在价值方法中我们并没有策略,因为我们训练的是价值函数,而不是策略。

别忘了,**RL 智能体的目标就是获得最优策略 π\*。**

为了找到最优策略,我们学过两种不同的方法:

- *基于策略的方法(policy-based methods):***直接训练策略**,让它在给定状态时选择要采取什么动作(或该状态下动作的概率分布)。在这种情况下,我们**没有价值函数。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/two-approaches-2.jpg" alt="两种 RL 方法"/>

策略以状态作为输入,输出在该状态下应采取什么动作(确定性策略(deterministic policy):给定一个状态时只输出一个动作的策略;与之相对,随机策略(stochastic policy)输出的则是动作上的概率分布)。

因此,**我们不需要手动定义策略的行为;是训练过程决定了它。**

- *价值方法(value-based methods):***间接地,通过训练一个价值函数**,让它输出某个状态或状态-动作对(state-action pair)的价值。有了这个价值函数,我们的策略**就会采取相应的动作。**

由于策略不是通过训练学到的,**我们需要规定它的行为。**举例来说,如果我们想要一个策略,在给定价值函数的情况下总是采取能带来最大奖励(reward)的动作,那么**我们就创建一个贪心策略(Greedy Policy)。**

<figure>
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/two-approaches-3.jpg" alt="两种 RL 方法"/>
  <figcaption>给定一个状态,我们训练的动作价值函数(action-value function)会输出该状态下每个动作的价值。然后,我们预先定义的贪心策略会在给定状态或状态-动作对的情况下,选择能产生最高价值的动作。</figcaption>
</figure>

所以,无论你用哪种方法来解决问题,**你都会有一个策略**。就价值方法而言,你并不训练策略:你的策略**只是一个简单的、预先规定好的函数**(例如贪心策略),它利用价值函数给出的价值来选择动作。

区别就在这里:

- 在基于策略的训练中,**最优策略(记作 π\*)是通过直接训练策略得到的。**
- 在基于价值的训练中,**找到最优价值函数(记作 Q\* 或 V\*,两者的区别我们稍后会学到)就能得到最优策略。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/link-value-policy.jpg" alt="价值与策略之间的联系"/>

实际上,在价值方法中,大多数时候你会使用**ε-贪心策略(Epsilon-Greedy Policy)**来处理探索/利用(exploration/exploitation)权衡;我们会在本单元第二部分讨论 Q-Learning 时再谈这一点。


如前所述,我们有两种类型的价值函数:

## 状态价值函数(state-value function)

策略 π 下的状态价值函数写作:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/state-value-function-1.jpg" alt="状态价值函数"/>

对每个状态,状态价值函数输出的都是:如果智能体**从这个状态出发**,之后一直遵循该策略(你也可以说,是未来的所有时间步),它能获得的期望回报(expected return)。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/state-value-function-2.jpg" alt="状态价值函数"/>
  <figcaption>以价值为 -7 的状态为例:它是从该状态出发、按照我们的策略(贪心策略)采取动作所能得到的期望回报,也就是向右、向右、向右、向下、向下、向右、向右。</figcaption>
</figure>

## 动作价值函数(action-value function)

在动作价值函数中,对每一个状态-动作对,动作价值函数**输出的都是期望回报**:即智能体从该状态出发、采取该动作,之后一直遵循该策略所能得到的回报。

在策略 \\(π\\) 下,在状态 \\(s\\) 采取动作 \\(a\\) 的价值是:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/action-state-value-function-1.jpg" alt="动作状态价值函数"/>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/action-state-value-function-2.jpg" alt="动作状态价值函数"/>


可以看到,区别在于:

- 对于状态价值函数,我们计算的是**某个状态 \\(S_t\\) 的价值**
- 对于动作价值函数,我们计算的是**状态-动作对( \\(S_t, A_t\\) )的价值,也就是在该状态下采取该动作的价值。**

<figure>
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/two-types.jpg" alt="两种价值函数"/>
  <figcaption>
注意:动作价值函数的示例中,我们没有填满全部的状态-动作对</figcaption>
</figure>

无论我们选择哪一种价值函数(状态价值函数或动作价值函数),**返回的值都是期望回报。**

然而,问题在于:**要计算每个状态或状态-动作对的价值,我们必须把智能体从该状态出发所能获得的全部奖励加总起来。**

这个过程的计算开销可能非常高,而这正是**贝尔曼方程(Bellman equation)派上用场、帮助我们解决问题的时刻。**
