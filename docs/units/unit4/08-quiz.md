> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/quiz.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/quiz.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 测验

学习以及[避免"能力错觉"](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最好方式**就是自我测试**。这有助于你发现**自己需要在哪些方面巩固知识**。


### Q1:与价值方法相比,策略梯度有哪些优势?(选出所有正确项)

<details markdown="1">
<summary>查看选项与解析</summary>

- ✅ **策略梯度方法可以学习一个随机策略**
- ✅ **策略梯度方法在高维动作空间和连续动作空间中更加有效**
- ❌ 策略梯度大多数情况下会收敛到全局最大值。
  - 💡 不对。策略梯度经常收敛到局部最大值,而不是全局最优。

</details>

### Q2:什么是策略梯度定理?

<details markdown="1">
<summary>解答</summary>

*策略梯度定理*是一个公式,它帮助我们把目标函数重新表述为一个可微函数,从而无需对状态分布求导。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/policy_gradient_theorem.png" alt="策略梯度"/>

</details>


### Q3:策略方法与策略梯度方法之间有什么区别?(选出所有正确项)

<details markdown="1">
<summary>查看选项与解析</summary>

- ❌ 策略方法是策略梯度方法的一个子集。
- ✅ **策略梯度方法是策略方法的一个子集。**
- ✅ **在策略方法中,我们可以**间接**地优化参数 θ:通过爬山法(hill climbing)、模拟退火(simulated annealing)或进化策略(evolution strategies)等技术最大化目标函数的局部近似。**
- ✅ **在策略梯度方法中,我们通过对目标函数的性能执行梯度上升,**直接**优化参数 θ。**

</details>


### Q4:为什么我们使用梯度上升而不是梯度下降来优化 J(θ)?

<details markdown="1">
<summary>查看选项与解析</summary>

- ❌ 我们想最小化 J(θ),而梯度上升给出的正是 J(θ) 上升最快的方向
- ✅ **我们想最大化 J(θ),而梯度上升给出的正是 J(θ) 上升最快的方向**

</details>

恭喜你完成了这个测验 🥳!如果有没答好的地方,花点时间重读本章,来"强化"(😏)一下你的知识吧。
