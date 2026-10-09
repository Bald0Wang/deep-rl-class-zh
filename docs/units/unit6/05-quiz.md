> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit6/quiz.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit6/quiz.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 测验

学习的最好方式,也是[避免"能力错觉"](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最好方式,**就是自我测试**。这能帮你发现**哪些地方需要巩固知识**。


### Q1:在强化学习领域,下列关于偏差-方差权衡(bias-variance tradeoff)的解释中,哪一项最准确?

<details markdown="1">
<summary>查看选项与解析</summary>

- ❌ 偏差-方差权衡反映的是模型能否把知识泛化到训练时提供给模型的那些已标注数据上。
  - 💡 这是机器学习中传统的偏差-方差权衡。在我们强化学习的具体场景中,没有预先标注好的数据,只有一个奖励信号。
- ✅ **偏差-方差权衡反映的是强化信号在多大程度上反映了智能体应从环境中获得的真实奖励**

</details>

### Q2:谈到强化学习中带偏差和/或方差的模型时,下列哪些说法是正确的?

<details markdown="1">
<summary>查看选项与解析</summary>

- ✅ **无偏的奖励信号返回的奖励接近环境真实/预期的奖励**
- ❌ 有偏的奖励信号返回的奖励接近环境真实/预期的奖励
  - 💡 如果奖励信号有偏,意味着我们得到的奖励信号与环境本应给出的真实奖励不一致
- ✅ **高方差的奖励信号含有大量噪声,会受到环境中随机(非恒定)因素等因素的影响**
- ❌ 低方差的奖励信号含有大量噪声,会受到环境中随机(非恒定)因素等因素的影响
  - 💡 如果奖励信号的方差低,那么它受环境噪声的影响更小,无论环境中有什么随机因素,都会产生相近的值

</details>


### Q3:关于蒙特卡洛(Monte Carlo)方法,下列哪些说法是正确的?

<details markdown="1">
<summary>查看选项与解析</summary>

- ✅ **它是一种采样机制,也就是说我们并不分析所有可能的状态,而是分析其中的一份样本**
- ❌ 它对随机性(轨迹中的随机因素)有很强的抵抗力
  - 💡 蒙特卡洛每次都会随机估计一份轨迹样本。然而,即便轨迹相同,只要其中含有随机因素,得到的奖励值也可能不同
- ✅ **为了降低蒙特卡洛中随机因素的影响,我们取 `n` 条策略并求其平均,从而降低各自的单独影响**

</details>

### Q4:请用自己的话描述一下 Actor-Critic 方法(A2C)?

<details markdown="1">
<summary>答案</summary>

Actor-Critic 背后的思想是,我们学习两个函数逼近:
1. 一个 `策略`,控制智能体的行动方式(π)
2. 一个 `价值` 函数,通过衡量所采取动作的好坏来辅助策略更新(q)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/step2.jpg" alt="Actor-Critic 第 2 步"/>

</details>

### Q5:关于 Actor-Critic 方法,下列哪些说法是正确的?

<details markdown="1">
<summary>查看选项与解析</summary>

- ❌ 在训练过程中,评论家(Critic)不学习任何函数
  - 💡 演员(Actor)和评论家的函数参数在训练期间都会被更新
- ✅ **演员学习的是策略函数,而评论家学习的是价值函数**
- ✅ **它增强了对随机性的抵抗力,并降低了高方差**

</details>



### Q6:在 A2C 方法中,`Advantage`(优势)是什么?

<details markdown="1">
<summary>答案</summary>

我们可以不直接照搬评论家的动作价值函数,而是使用一个 `Advantage`(优势)函数。优势函数背后的思想是:计算某个动作相对于一个状态下其他可能动作的相对优势,并对它们取平均。

换句话说:在该状态下采取这个动作,比起该状态的平均价值要好多少。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/advantage1.jpg" alt="A2C 中的优势"/>

</details>

恭喜你完成这个测验 🥳!如果有遗漏的地方,花点时间重读本章,来"强化"(😏)一下你的知识。
