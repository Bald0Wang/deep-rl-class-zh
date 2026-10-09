> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit3/from-q-to-dqn.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit3/from-q-to-dqn.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 从 Q-Learning 到深度 Q 学习

我们已经学到,**Q-Learning 是我们用来训练 Q 函数的算法**,它是一个**动作价值函数(action-value function)**,用于确定处于某个特定状态并在该状态下采取某个特定动作的价值。

<figure>
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-function.jpg" alt="Q 函数"/>
</figure>

**Q 来自该动作在该状态下的"Quality"(质量)。**

在内部,我们的 Q 函数由 **Q 表(Q-table)编码——Q 表是一张表格,其中每个单元格对应一个状态-动作对的价值**。可以把这张 Q 表看作**Q 函数的记忆或小抄**。

问题在于,Q-Learning 是一种*表格型方法(tabular method)*。当状态空间和动作空间**大到无法用数组和表格高效表示**时,这就会成为问题。换句话说,它**不可扩展**。
Q-Learning 在状态空间较小的环境中工作良好,例如:

- FrozenLake,只有 16 个状态。
- Taxi-v3,有 500 个状态。

但想想我们今天要做的事:我们将以帧(frame)作为输入,训练一个智能体学习玩更复杂的游戏 Space Invaders(太空侵略者)。

正如 **[Nikita Melkozerov 提到](https://twitter.com/meln1k)的,Atari 环境**的观测空间形状为 (210, 160, 3)*,取值范围从 0 到 255,因此我们有 \(256^{210 \times 160 \times 3} = 256^{100800}\) 种可能的观测(作为对比,可观测宇宙中大约有 \(10^{80}\) 个原子)。

* Atari 中的单帧由一幅 210x160 像素的图像构成。由于图像是彩色的(RGB),有 3 个通道,这就是形状为 (210, 160, 3) 的原因。对每个像素而言,取值范围是 0 到 255。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/atari.jpg" alt="Atari 状态空间"/>

因此,状态空间是巨大的;正因如此,为该环境创建和更新 Q 表是低效的。在这种情况下,最好的办法是使用参数化 Q 函数 \(Q_{\theta}(s,a)\) 来近似 Q 值。

这个神经网络在给定一个状态时,会近似该状态下每个可能动作的不同 Q 值。而这正是深度 Q 学习所做的。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/deep.jpg" alt="深度 Q 学习"/>


现在我们已经理解了深度 Q 学习,接下来让我们深入了解深度 Q 网络(Deep Q-Network,DQN)。
