> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit3/quiz.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit3/quiz.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 测验

学习和[避免能力错觉](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最好方式**就是自我测试**。这能帮助你发现**哪些地方需要巩固你的知识**。

### Q1:我们提到 Q-Learning 是一种表格型方法。什么是表格型方法?

<details>
<summary>解答</summary>

*表格型方法*是指这样一类问题:状态空间和动作空间足够小,使得要近似的价值函数可以**用数组和表格来表示**。例如,**Q-Learning 就是一种表格型方法**,因为我们用一张表格来表示状态和动作价值对。


</details>

### Q2:为什么我们不能用经典的 Q-Learning 来解决 Atari 游戏?

<Question
	choices={[
		{
			text: "Atari 环境对 Q-Learning 来说运行得太快",
			explain: ""
		},
		{
			text: "Atari 环境的观测空间很大。因此,创建和更新 Q 表会很低效",
			explain: "",
      correct: true
		}
	]}
/>


### Q3:在深度 Q 学习中,当我们以帧作为输入时,为什么要叠加 4 帧?

<details>
<summary>解答</summary>

我们把帧叠加在一起,是因为这有助于我们**解决时间局限问题**:单帧不足以捕捉时间信息。
例如,在 Pong(乒乓)游戏中,**如果智能体只获得一帧,它将无法知道球的方向**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/temporal-limitation.jpg" alt="时间局限"/>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/temporal-limitation-2.jpg" alt="时间局限"/>


</details>


### Q4:深度 Q 学习的两个阶段是什么?

<Question
	choices={[
		{
			text: "采样(Sampling)",
			explain: "我们执行动作,并将观测到的经验元组存储到回放记忆中。",
      correct: true,
		},
		{
			text: "打乱(Shuffling)",
			explain: "",
		},
    {
      text: "重排序(Reranking)",
      explain: "",
    },
    {
			text: "训练(Training)",
			explain: "我们随机选取一小批元组,并通过一步梯度下降更新从这批数据中学习。",
      correct: true,
		}
	]}
/>

### Q5:为什么我们要在深度 Q 学习中创建回放记忆?

<details>
   <summary>解答</summary>

**1. 在训练期间更高效地利用经验**

通常,在在线强化学习中,智能体在环境中交互,获得经验(状态、动作、奖励和下一状态),从中学习(更新神经网络),然后将其丢弃。这并不高效。
但是,通过经验回放,**我们创建一个回放缓冲区,保存可以在训练期间重复使用的经验样本**。

**2. 避免遗忘以往的经验,并减少经验之间的相关性**

  如果我们按顺序向神经网络提供经验样本,就会遇到这样的问题:**随着新经验不断覆盖写入,它往往会遗忘之前的经验**。例如,我们先在第一关,然后进入截然不同的第二关,我们的智能体可能会忘记在第一关该如何行动和游玩。


</details>

### Q6:我们如何使用双重深度 Q 学习(Double Deep Q-Learning)?


<details>
  <summary>解答</summary>

  在计算 Q 目标时,我们使用两个网络来解耦动作选择与目标 Q 值的生成。我们:

  - 使用*DQN 网络***为下一状态选择要执行的最佳动作**(Q 值最高的动作)。

  - 使用*目标网络*计算**在下一状态执行该动作的目标 Q 值**。

</details>


恭喜你完成了这个测验 🥳,如果你遗漏了一些要点,花点时间重读本章,来巩固(😏)你的知识。
