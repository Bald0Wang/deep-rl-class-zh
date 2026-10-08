> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit3/deep-q-network.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit3/deep-q-network.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 深度 Q 网络(DQN)

这就是我们深度 Q 学习网络的架构:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/deep-q-network.jpg" alt="深度 Q 网络"/>

作为输入,我们取**4 帧的叠加**作为状态传入网络,并输出**该状态下每个可能动作的 Q 值向量**。然后,与 Q-Learning 一样,我们只需使用 epsilon-贪婪策略(epsilon-greedy policy)来选择要执行的动作。

当神经网络初始化时,**对 Q 值的估计非常糟糕**。但在训练过程中,我们的深度 Q 网络智能体会将情境与合适的动作关联起来,并**学会把游戏玩好**。

## 输入预处理与时间局限

我们需要**对输入进行预处理**。这是必不可少的一步,因为我们想要**降低状态的复杂度,从而减少训练所需的计算时间**。

为此,我们**把状态空间缩小到 84x84 并进行灰度化**。之所以可以这样做,是因为 Atari 环境中的颜色并不会带来重要信息。
这是一个很大的改进,因为我们**把三个颜色通道(RGB)减少到了 1 个**。

在某些游戏中,如果屏幕的某一部分不包含重要信息,我们还可以**把它裁剪掉**。
然后我们把 4 帧叠加在一起。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/preprocessing.jpg" alt="预处理"/>

**为什么要叠加 4 帧?**
我们把帧叠加在一起,是因为这有助于我们**解决时间局限(temporal limitation)问题**。以 Pong(乒乓)游戏为例。当你看到下面这一帧:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/temporal-limitation.jpg" alt="时间局限"/>

你能告诉我球正往哪个方向去吗?
不能,因为单帧不足以形成运动感!但如果我再添加三帧,会怎样呢?**你就能看出球正朝右移动**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/temporal-limitation-2.jpg" alt="时间局限"/>
这就是为什么,为了捕捉时间信息,我们要把 4 帧叠加在一起。

然后,叠加后的帧会经过三个卷积层的处理。这些层**使我们能够捕捉并利用图像中的空间关系**。同时,由于帧是叠加在一起的,**我们还能利用帧与帧之间的某些时间特性**。

如果你不知道什么是卷积层,别担心。你可以查看[Udacity 这门免费深度学习课程的第 4 课](https://www.udacity.com/course/deep-learning-pytorch--ud188)

最后,我们还有几个全连接层,它们为该状态下每个可能的动作输出一个 Q 值。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/deep-q-network.jpg" alt="深度 Q 网络"/>

由此我们看到,深度 Q 学习使用一个神经网络,在给定一个状态时,近似该状态下每个可能动作的不同 Q 值。接下来,让我们研究深度 Q 学习算法。
