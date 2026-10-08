> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit5/quiz.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit5/quiz.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 测验

学习以及[避免"能力错觉"](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最好方式，**就是自我测试**。这能帮你发现自己**需要在哪些方面巩固知识**。

### Q1：以下哪些工具是专门为电子游戏开发设计的？

<Question
	choices={[
		{
			text: "Unity (C#)",
			explain: "",
            correct: true,
		},
		{
			text: "Unreal Engine (C++)",
			explain: "",
            correct: true,
		},
		{
			text: "Godot (GDScript, C++, C#)",
			explain: "",
            correct: true,
		},
		{
			text: "JetBrains 的 Rider",
			explain: "虽然它对 Unity 的 C# 支持很有用，但它并不是专门用于电子游戏开发的 IDE",
            correct: false,
		},
		{
			text: "JetBrains 的 CLion",
			explain: "虽然它对 Unreal Engine 的 C++ 支持很有用，但它并不是专门用于电子游戏开发的 IDE",
            correct: false,
		},
		{
			text: "Microsoft Visual Studio 和 Visual Studio Code",
			explain: "虽然它们都同时支持 Unity 和 Unreal，但它们是通用 IDE，并非面向电子游戏开发。",
            correct: false,
		},
	]}
/>

### Q2：关于 Unity ML-Agents，以下哪些说法是正确的？

<Question
	choices={[
		{
			text: "Unity 的 Scene（场景）对象可用于创建学习环境",
			explain: "",
            correct: true,
		},
		{
			text: "Unity ML-Agents 允许你使用强化学习来创建并训练你的智能体",
			explain: "",
            correct: true,
		},
        {
			text: "它的 `Communicator` 组件负责管理 Unity 的 C# 环境/智能体与 Python 后端之间的通信",
			explain: "",
            correct: true,
		},
        {
			text: "训练过程使用强化学习算法，并用 PyTorch 实现",
			explain: "",
            correct: true,
		},
        {
			text: "Unity ML-Agents 只支持近端策略优化（Proximal Policy Optimization，PPO）",
			explain: "不对，Unity ML-Agents 支持多类算法，包括 Actor-Critic（演员-评论家），我们将在下一节中介绍",
            correct: false,
		},
        {
			text: "它包含一个 Gym Wrapper，以及它的多智能体版本，名为 `PettingZoo`",
			explain: "",
            correct: true,
		},
	]}
/>

### Q3：补全缺失的字母

- 在 Unity ML-Agents 中，智能体（Agent）的策略（Policy）被称为 b \_ \_ \_ n
- 负责统筹各智能体的组件被称为 \_ c \_ \_ \_ m \_

<details>
<summary>答案</summary>
<ul>
	<li>b r a i n</li>
	<li>a c a d e m y</li>
</ul>
</details>

### Q4：用自己的话定义什么是 `raycast`（射线投射）

<details>
<summary>答案</summary>
raycast（射线投射）大多数情况下是一种线性投影，就像一束"激光"，用于检测与物体之间发生的碰撞。
</details>

### Q5：使用 `frames`（帧）和 `raycasts`（射线投射）来捕获环境有什么区别？

<Question
	choices={[
    {
      text: "使用 `frames` 时，环境由屏幕上的每一个像素来定义；使用 `raycasts` 时，我们只发送这些像素的一个采样。",
      explain: "`raycasts` 与像素毫无关系。它们是我们发射出来用于寻找碰撞的线性投影（激光）。",
      correct: false,
    },
    {
      text: "使用 `raycasts` 时，环境由屏幕上的每一个像素来定义；使用 `frames` 时，我们发射一条（通常为直的）线来检测它与哪些物体发生碰撞",
      explain: "正好说反了——`frames` 收集像素，`raycasts` 检测碰撞。",
      correct: false,
    },
    {
      text: "使用 `frames` 时，我们收集屏幕上的全部像素，由它们来定义环境；使用 `raycast` 时，我们不使用像素，而是（通常）发射线条并检测它们的碰撞",
      explain: "",
      correct: true,
    },
	]}
/>


### Q6：说出在 Snowball 或 Pyramid 环境中用于训练智能体的若干环境与智能体输入变量

<details>
<summary>答案</summary>
- 从智能体发出的 raycast 检测到的与方块、（不可见）墙壁、石块、我们的目标、开关等的碰撞
- 描述智能体自身特征的传统输入，例如它的速度
- 布尔变量，例如 Pyramids 中的开关（开/关）或 SnowballTarget 中的"能否射击？"
</details>


恭喜你完成本次测验 🥳。如果有些内容没答对，不妨花点时间重读本章，来"巩固"（😏）你的知识。
