> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/mid-way-quiz.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/mid-way-quiz.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 阶段性测验

学习的最佳方式,也是[避免"能力错觉"](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最佳方式,**就是自我测试。**这能帮你找出**自己需要巩固哪些知识**。


### Q1:寻找最优策略的两种主要方法是什么?


<Question
	choices={[
		{
			text: "基于策略的方法(Policy-based methods)",
			explain: "使用基于策略的方法时,我们直接训练策略,让它学会在给定状态下应采取哪个动作。",
      correct: true
		},
		{
			text: "基于随机的方法(Random-based methods)",
			explain: ""
		},
    {
			text: "基于价值的方法(Value-based methods)",
			explain: "使用基于价值的方法时,我们训练一个价值函数来学习哪个状态更有价值,并利用这个价值函数来选择能通向该状态的动作。",
      correct: true
		},
		{
			text: "进化策略方法(Evolution-strategies methods)",
      explain: ""
		}
	]}
/>


### Q2:什么是贝尔曼方程?

<details>
<summary>解答</summary>

**贝尔曼方程是一个递归方程**,它的工作方式是:对于每个状态,我们不必从头开始计算回报,而是可以把任意状态的价值看作:

Rt+1 + gamma * V(St+1)

即:即时奖励 + 后继状态的折扣价值

</details>

### Q3:说明贝尔曼方程中每一部分的含义

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman4-quiz.jpg" alt="贝尔曼方程测验"/>


<details>
<summary>解答</summary>

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/bellman4.jpg" alt="贝尔曼方程解答"/>

</details>

### Q4:蒙特卡洛方法与时序差分学习方法有什么区别?

<Question
	choices={[
		{
			text: "蒙特卡洛方法基于一个完整回合来更新价值函数",
			explain: "",
      correct: true
		},
    {
			text: "蒙特卡洛方法基于一步来更新价值函数",
			explain: ""
		},
    {
			text: "TD 学习方法基于一个完整回合来更新价值函数",
			explain: ""
		},
    {
			text: "TD 学习方法基于一步来更新价值函数",
			explain: "",
      correct: true
		},
	]}
/>

### Q5:说明时序差分学习公式中每一部分的含义

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/td-ex.jpg" alt="TD 学习练习"/>

<details>
<summary>解答</summary>

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-1.jpg" alt="TD 练习"/>

</details>


### Q6:说明蒙特卡洛方法公式中每一部分的含义

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/mc-ex.jpg" alt="蒙特卡洛方法练习"/>

<details>
<summary>解答</summary>

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/monte-carlo-approach.jpg" alt="蒙特卡洛练习"/>

</details>

恭喜你完成本测验 🥳!如果有些内容没有掌握,不妨花点时间重读前面的章节,来巩固(😏)你的知识。
