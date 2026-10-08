> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/quiz.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/quiz.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 测验

学习和[避免"能力错觉"](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最好方式,**就是自我测试**。这能帮助你发现**哪些地方需要巩固知识**。

### Q1:什么是强化学习?

<details>
<summary>答案</summary>

强化学习是一种**解决控制任务(也称为决策问题)的框架**:它通过构建智能体,让智能体通过与环境的反复试错交互来学习,并把**奖励(正的或负的)作为唯一的反馈**。

</details>

### Q2:描述强化学习循环

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/rl-loop-ex.jpg" alt="练习:强化学习循环"/>

在每一步中:
- 我们的智能体从环境接收 ______
- 基于该 ______,智能体采取一个 ______
- 我们的智能体会向右移动
- 环境进入一个 ______
- 环境给智能体一个 ______

<Question
	choices={[
		{
			text: "动作 a0、动作 a0、状态 s0、状态 s1、奖励 r1",
			explain: "在每一步中:我们的智能体从环境接收**状态 s0**。基于**状态 s0**,智能体采取一个**动作 a0**。我们的智能体会向右移动。环境进入**新状态 s1**。环境给智能体**一个奖励 r1**。"
		},
		{
			text: "状态 s0、状态 s0、动作 a0、新状态 s1、奖励 r1",
			explain: "",
      correct: true
		},
		{
			text: "状态 s0、状态 s0、动作 a0、状态 s1、动作 a1",
      explain: "在每一步中:我们的智能体从环境接收**状态 s0**。基于**状态 s0**,智能体采取一个**动作 a0**。我们的智能体会向右移动。环境进入**新状态 s1**。环境给智能体**一个奖励 r1**。"
		}
	]}
/>

### Q3:状态和观测有什么区别?

<Question
	choices={[
		{
			text: "状态是对世界状态的完整描述(没有隐藏信息)",
			explain: "",
      correct: true
		},
    {
			text: "状态是对状态的部分描述",
			explain: ""
		},
    {
      text: "观测是对世界状态的完整描述(没有隐藏信息)",
      explain: ""
    },
    {
      text: "观测是对状态的部分描述",
      explain: "",
      correct: true
    },
    {
      text: "下国际象棋时,我们接收到的是状态",
      explain: "因为我们可以获得整个棋盘的信息。",
      correct: true
    },
    {
      text: "下国际象棋时,我们接收到的是观测",
      explain: "因为我们可以获得整个棋盘的信息。"
    },
    {
      text: "玩超级马里奥兄弟时,我们接收到的是状态",
      explain: "我们只能看到玩家附近关卡的一部分,所以我们接收到的是观测。"
    },
    {
      text: "玩超级马里奥兄弟时,我们接收到的是观测",
      explain: "我们只能看到玩家附近关卡的一部分。",
      correct: true
    }
	]}
/>

### Q4:任务是强化学习问题的一个实例。任务有哪两种类型?

<Question
	choices={[
		{
			text: "回合式任务(Episodic)",
			explain: "在回合式任务中,我们有起点和终点(一个终止状态)。这构成了一个回合(episode):由状态、动作、奖励和新状态组成的序列。例如,想想超级马里奥兄弟:一个回合从新关卡开始时启动,到你被消灭或到达关卡末尾时结束。",
      correct: true
		},
    {
			text: "递归(Recursive)",
			explain: ""
		},
    {
			text: "对抗(Adversarial)",
			explain: ""
		},
    {
      text: "连续任务(Continuing)",
      explain: "连续任务是永远持续下去的任务(没有终止状态)。在这种情况下,智能体必须学会在持续与环境交互的同时,选择最佳动作。",
      correct: true
    }
	]}
/>

### Q5:什么是探索与利用的权衡?

<details>
<summary>答案</summary>

在强化学习中,我们需要**权衡探索环境的程度,以及利用已有环境知识的程度**。

- *探索(exploration)*是通过**尝试随机动作来探索环境,以获取更多关于环境的信息**。

- *利用(exploitation)*是**利用已知信息来最大化奖励**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/expexpltradeoff.jpg" alt="探索与利用的权衡" width="100%">

</details>

### Q6:什么是策略?

<details>
<summary>答案</summary>

- 策略 π **是我们智能体的大脑**。它是一个函数,告诉我们,在当前状态下应采取什么动作。因此,它定义了智能体在给定时刻的行为。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/policy_1.jpg" alt="策略">

</details>

### Q7:什么是基于价值的方法?

<details>
<summary>答案</summary>

- 基于价值的方法是解决强化学习问题的主要思路之一。
- 在基于价值的方法中,我们不是训练策略函数,而是**训练一个价值函数(value function),它把某个状态映射到处于该状态的期望价值**。

</details>

### Q8:什么是基于策略的方法?

<details>
<summary>答案</summary>

- 在*基于策略的方法*中,我们**直接学习策略函数**。
- 这个策略函数会**把每个状态映射到该状态下最佳的动作**,或者映射为**该状态下一组可能动作上的概率分布**。

</details>

恭喜你完成本次测验 🥳!如果有遗漏的地方,花点时间重读本章来巩固(😏)知识。不过**不必担心**:在课程中我们会反复讲到这些概念,你也会**通过实操来巩固理论知识**。
