> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/exp-exp-tradeoff.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/exp-exp-tradeoff.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 探索与利用的权衡(Exploration/Exploitation trade-off)

最后,在介绍解决强化学习问题的不同方法之前,我们还必须讲一个非常重要的主题:*探索与利用的权衡(exploration/exploitation trade-off)*。

- *探索(Exploration)* 是通过尝试随机动作来探索环境,以便**找到更多关于环境的信息。**
- *利用(Exploitation)* 是**利用已知信息来最大化奖励。**

请记住,我们的强化学习智能体的目标是最大化期望累积奖励(expected cumulative reward)。然而,**我们很容易掉进一个常见的陷阱**。

让我们来看一个例子:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/exp_1.jpg" alt="探索" width="100%">

在这个游戏中,我们的老鼠可以获得**无限多的小奶酪**(每块 +1)。但在迷宫的顶端,有一大堆奶酪(+1000)。

然而,如果我们只专注于利用,我们的智能体就永远无法到达那一大堆奶酪。相反,它只会利用**最近的奖励来源**,即使这个来源很小(利用)。

但如果我们的智能体稍微进行一点探索,它就能**发现那个大的奖励**(那一大堆大奶酪)。

这就是我们所说的探索与利用的权衡。我们需要平衡**探索环境的程度**与**利用已知环境信息的程度**。

因此,我们必须**定义一条规则来帮助处理这种权衡**。我们将在后续单元中看到处理它的不同方法。

如果还是感到困惑,**不妨想一个现实中的问题:选择哪家餐厅:**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/exp_2.jpg" alt="探索">
<figcaption>来源:<a href="https://inst.eecs.berkeley.edu/~cs188/sp20/assets/lecture/lec15_6up.pdf">Berkley AI 课程</a>
</figcaption>
</figure>

- *利用*:你每天都去自己已知不错的那家餐厅,**冒着错过其他更好餐厅的风险。**
- *探索*:尝试你从未去过的餐厅,有可能体验糟糕,**但也可能因此获得绝佳的体验。**

总结一下:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/expexpltradeoff.jpg" alt="探索与利用的权衡" width="100%">
