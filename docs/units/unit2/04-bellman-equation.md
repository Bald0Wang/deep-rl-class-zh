> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/bellman-equation.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/bellman-equation.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 贝尔曼方程:简化我们的价值估计

贝尔曼方程(Bellman equation)**简化了我们对状态价值(state value)或状态-动作价值(state-action value)的计算。**


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman.jpg" alt="贝尔曼方程"/>

根据到目前为止所学的内容,我们知道:如果要计算 \\(V(S_t)\\)(某个状态(state)的价值),就需要计算从该状态出发、之后一直遵循策略(policy)所能得到的回报(return)。**(在下面的例子中,我们定义的策略是贪心策略(Greedy Policy);为了简化,我们不对奖励(reward)做折扣)。**

所以,要计算 \\(V(S_t)\\),我们需要计算期望奖励之和。于是:

<figure>
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman2.jpg" alt="贝尔曼方程"/>
  <figcaption>计算状态 1 的价值:智能体(agent)从该状态出发,在所有时间步都遵循贪心策略(采取能到达最优状态值的动作)时的奖励总和。</figcaption>
</figure>

接着,要计算 \\(V(S_{t+1})\\),我们需要计算从状态 \\(S_{t+1}\\) 出发的回报。

<figure>
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman3.jpg" alt="贝尔曼方程"/>
  <figcaption>计算状态 2 的价值:即<b>智能体从该状态出发</b>,之后在所有时间步都遵循<b>策略</b>时的奖励总和。</figcaption>
</figure>

你可能已经注意到了:我们在重复计算不同状态的价值,如果要对每个状态价值或状态-动作价值都这样做,会非常繁琐。

与其为每个状态或每个状态-动作对都计算期望回报,**我们可以使用贝尔曼方程。**(提示:如果你知道什么是动态规划(Dynamic Programming),会发现这非常类似!不知道也没关系!)

贝尔曼方程是一个递归方程,它的思路是这样的:对每个状态,我们不必从头开始计算回报,而是可以把任意状态的价值看作:

**即时奖励 \\(R_{t+1}\\) + 之后那个状态的折扣价值( \\(\gamma * V(S_{t+1}) \\) )。**

<figure>
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman4.jpg" alt="贝尔曼方程"/>
</figure>


回到我们的例子:可以说,状态 1 的价值就等于我们从该状态出发所能得到的期望累积回报。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman2.jpg" alt="贝尔曼方程"/>


计算状态 1 的价值:即**智能体从状态 1 出发**,之后在所有时间步都遵循**策略**时的奖励总和。

这等价于 \\(V(S_{t})\\) = 即时奖励 \\(R_{t+1}\\) + 下一状态的折扣价值 \\(\gamma * V(S_{t+1})\\)

<figure>
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman6.jpg" alt="贝尔曼方程"/>
  <figcaption>为了简化,这里我们不做折扣,所以 gamma = 1。</figcaption>
</figure>

为了简单起见,这里我们不做折扣,所以 gamma = 1。
但在本单元的 Q-Learning 一节中,你会看到一个 gamma = 0.99 的例子。

- \\(V(S_{t+1}) \\) 的价值 = 即时奖励 \\(R_{t+2}\\) + 下一状态的折扣价值( \\(gamma * V(S_{t+2})\\) )。
- 以此类推。




总结一下,贝尔曼方程的思想是:与其把每个价值都计算成期望回报之和——**这个过程很漫长**——我们把价值计算为**即时奖励 + 之后那个状态的折扣价值。**

在进入下一节之前,想一想 gamma 在贝尔曼方程中的作用。如果 gamma 的值非常小(比如 0.1 甚至 0),会发生什么?如果值是 1 呢?如果值非常大,比如一百万,又会怎样?
