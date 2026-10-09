> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 简介

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/thumbnail.png" alt="缩略图"/>

在上一单元中,我们学习了 Deep Q-Learning(深度 Q 学习)。在这个价值型(value-based)深度强化学习算法中,我们**用深度神经网络来逼近某一状态下每种可能动作各自的 Q 值。**

自开课以来,我们研究的都是价值方法(value-based methods):**先估计一个价值函数,把它当作寻找最优策略的中间步骤。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/link-value-policy.jpg" alt="价值与策略的联系" />

在价值方法中,**策略 \(π\) 之所以存在,完全是靠动作价值估计——因为策略只是一个函数**(例如贪婪策略),它会根据给定状态选出价值最高的动作。

而有了策略方法(policy-based methods),我们就可以直接优化策略,**省去学习价值函数这个中间步骤。**

所以今天,**我们将学习策略方法,并研究其中一个子类——策略梯度(policy gradient)**。随后,我们会用 PyTorch 从零开始实现第一个策略梯度算法:蒙特卡洛 **Reinforce**。
接着,我们会用 CartPole-v1(倒立摆)和 PixelCopter(像素直升机)环境来测试它的鲁棒性。

之后,你就可以在这个实现的基础上不断迭代、改进,去应对更高级的环境。

<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/envs.gif" alt="环境"/>
</figure>

让我们开始吧!
