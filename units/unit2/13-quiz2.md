> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/quiz2.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/quiz2.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 第二单元测验

学习的最好方式,也是[避免"能力错觉"](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最好方式,**就是自我测试**。这能帮助你发现**哪些地方需要巩固知识**。


### Q1:什么是 Q-Learning?


<Question
	choices={[
		{
			text: "我们用来训练 Q 函数的算法",
			explain: "",
      correct: true
		},
		{
			text: "一个价值函数",
			explain: "它其实是一个动作价值函数,因为它确定的是处于某个特定状态并在该状态采取特定动作的价值",
		},
    {
			text: "一种确定处于某个特定状态并在该状态采取特定动作的价值的算法",
			explain: "Q 函数才是确定处于某个特定状态并在该状态采取特定动作的价值的那个函数。",
		},
		{
			text: "一张表",
      			explain: "Q-Learning 不是 Q 表。Q 函数才是用来填充 Q 表的算法。"
		}
	]}
/>

### Q2:什么是 Q 表?

<Question
	choices={[
		{
			text: "我们在 Q-Learning 中使用的一种算法",
			explain: "",
		},
		{
			text: "Q 表是我们智能体的内部存储",
			explain: "",
      correct: true
		},
    {
			text: "Q 表中每个单元格对应一个状态价值",
			explain: "每个单元格对应的是一个状态-动作对的价值,而不是状态价值。",
		}
	]}
/>

### Q3:为什么有了最优 Q 函数 Q*,我们就有最优策略?

<details>
<summary>解答</summary>

因为如果我们拥有最优 Q 函数,我们也就拥有最优策略——因为我们知道每个状态下什么是最佳动作。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/link-value-policy.jpg" alt="link value policy"/>

</details>

### Q4:你能解释一下什么是 epsilon-贪婪策略吗?

<details>
<summary>解答</summary>
epsilon-贪婪策略(epsilon-greedy strategy)是一种处理探索与利用权衡的策略。

思路是我们定义 epsilon ɛ = 1.0:

- 以 *1 — ɛ 的概率*:我们进行利用(即智能体选择状态-动作对价值最高的动作)。
- 以 *ɛ 的概率*:我们进行探索(尝试随机动作)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-4.jpg" alt="Epsilon Greedy"/>


</details>

### Q5:如何更新一个状态-动作对的 Q 值?
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-update-ex.jpg" alt="Q Update exercise"/>

<details>
<summary>解答</summary>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-update-solution.jpg" alt="Q Update exercise"/>

</details>



### Q6:on-policy 与 off-policy 有什么区别

<details>
<summary>解答</summary>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/off-on-4.jpg" alt="On/off policy"/>
</details>

恭喜你完成本测验 🥳!如果有没掌握的地方,花点时间重读本章,来巩固(😏)你的知识吧。
