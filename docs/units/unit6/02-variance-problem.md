> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit6/variance-problem.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit6/variance-problem.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# REINFORCE 的方差问题

在 REINFORCE 中,我们希望**按照回报(return)的高低,成比例地提升一条轨迹(trajectory)中各个动作的概率**。


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/pg.jpg"  alt="REINFORCE"/>

- 如果**回报很高**,我们就**推高**这些(状态, 动作)组合的概率。
- 反之,如果**回报很低**,则会**拉低**这些(状态, 动作)组合的概率。

这个回报 \(R(\tau)\) 是用*蒙特卡洛(Monte-Carlo)采样*计算出来的。我们采集一条轨迹并计算折扣回报,**再用这个分数来提升或降低该轨迹中所采取的每一个动作的概率**。如果回报不错,所有动作都会通过提高被选中的可能性而得到"强化"。

\(R(\tau) = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + ...\)

这种方法的优点是**它没有偏差(bias)。因为我们并不是在估计回报**,而是直接使用我们实际得到的真实回报。

由于环境具有随机性(回合(episode)中会出现随机事件),策略本身也具有随机性,**不同的轨迹可能带来不同的回报,从而导致高方差(variance)**。因此,同一个起始状态可能产生截然不同的回报。
也正因如此,**从同一状态出发,不同回合的回报可能出现显著波动**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/variance.jpg" alt="方差"/>

解决办法是**使用大量轨迹来缓解方差,寄希望于单条轨迹引入的方差能在整体上相互抵消,从而得到对回报的"真实"估计**。

然而,增大批次(batch)大小会显著**降低样本效率(sample efficiency)**。因此,我们需要找到其他机制来降低方差。

---
如果你想更深入地了解深度强化学习中方差与偏差的权衡问题,可以阅读下面两篇文章:
- [Making Sense of the Bias / Variance Trade-off in (Deep) Reinforcement Learning](https://blog.mlreview.com/making-sense-of-the-bias-variance-trade-off-in-deep-reinforcement-learning-79cf1e83d565)
- [Bias-variance Tradeoff in Reinforcement Learning](https://www.endtoend.ai/blog/bias-variance-tradeoff-in-reinforcement-learning/)
- [High Variance in Policy gradients](https://balajiai.github.io/high_variance_in_policy_gradients)
---
