> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/deep-rl.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/deep-rl.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 强化学习中的"深度"(Deep)

<Tip>
到目前为止,我们讨论的都是强化学习。那么,"深度"体现在哪里呢?
</Tip>

深度强化学习(Deep Reinforcement Learning)引入了**深度神经网络来解决强化学习问题**——"深度"(deep)之名由此而来。

例如,在下一个单元中,我们将学习两种价值方法的算法:Q-Learning(经典强化学习),然后是 Deep Q-Learning。

你会看到,两者的区别在于:第一种方法中,**我们使用传统算法**创建一个 Q 表(Q table),帮助我们找出每个状态下应采取的动作。

第二种方法中,**我们将使用神经网络(Neural Network)**(来近似 Q 值)。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/deep.jpg" alt="基于价值的强化学习"/>
<figcaption>示意图改编自 Udacity 的 Q learning notebook
</figcaption>
</figure>

如果你还不熟悉深度学习,强烈建议观看 [FastAI 的 Practical Deep Learning for Coders 课程](https://course.fast.ai)(免费)。
