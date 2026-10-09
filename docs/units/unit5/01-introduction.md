> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit5/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit5/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Unity ML-Agents 简介

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/thumbnail.png" alt="缩略图"/>

强化学习的挑战之一就是**创建环境**。幸运的是,我们可以借助游戏引擎来完成这项工作。[Unity](https://unity.com/)、[Godot](https://godotengine.org/)、[Unreal Engine](https://www.unrealengine.com/) 等游戏引擎本是用来制作电子游戏的程序,但它们也非常适合用来创建环境:它们提供了物理系统、2D/3D 渲染等诸多功能。


其中,[Unity](https://unity.com/) 开发了 [Unity ML-Agents Toolkit](https://github.com/Unity-Technologies/ml-agents),这是一个基于 Unity 游戏引擎的插件,让我们可以**把 Unity 游戏引擎当作环境构建器来训练智能体**。在第一个附加单元(bonus unit 1)中,我们正是用它训练了 Huggy 去接住木棍!

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/example-envs.png" alt="ML-Agents 环境"/>
<figcaption>来源:<a href="https://github.com/Unity-Technologies/ml-agents">ML-Agents 文档</a></figcaption>
</figure>

Unity ML-Agents Toolkit 提供了许多出色的预制环境,涵盖踢足球、学习走路、翻越高墙等场景。

在本单元中,我们将学习使用 ML-Agents,不过**如果你不会使用 Unity 游戏引擎也不必担心**:训练智能体并不需要用到它。

所以,今天我们要训练两个智能体:
- 第一个将学习**用雪球击中不断生成的靶子**。
- 第二个需要**按下按钮生成金字塔(Pyramid),然后走向金字塔、把它推倒,再跑到塔顶的金砖处**。要做到这一点,它需要探索环境,而这将通过一种叫作好奇心(curiosity)的技术来实现。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/envs.png" alt="环境" />

训练完成后,**你会把训练好的智能体推送到 Hugging Face Hub**,然后就可以**直接在浏览器中观看它们游玩,而无需使用 Unity Editor**。

完成本单元将**为你迎接下一个挑战做好准备:AI 对战 AI(AI vs. AI)——你将在多智能体环境中训练智能体,并与同学们的智能体一较高下**。

听起来很刺激吧?让我们开始吧!
