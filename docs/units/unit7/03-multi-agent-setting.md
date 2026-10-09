> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit7/multi-agent-setting.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit7/multi-agent-setting.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 设计多智能体系统

在本节中,你将观看由 <a href="https://www.youtube.com/channel/UCq0imsn84ShAe9PBOFnoIrg"> Brian Douglas </a> 制作的一份出色的多智能体入门视频。

[▶️ 观看本节视频(YouTube)](https://www.youtube.com/watch?v=qgb0gyrpiGk)


在这个视频中,Brian 讲解了如何设计多智能体系统。他特意以一个由吸尘器组成的多智能体系统为例,提出了这样的问题:**吸尘器之间该如何相互合作**?

我们有两种方案来设计这个多智能体强化学习系统(MARL)。

## 去中心化系统

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/decentralized.png" alt="Decentralized"/>
<figcaption>
来源:<a href="https://www.youtube.com/watch?v=qgb0gyrpiGk"> Introduction to Multi-Agent Reinforcement Learning </a>
</figcaption>
</figure>

在去中心化学习(decentralized learning)中,**每个智能体独立于其他智能体进行训练**。在给出的例子中,每台吸尘器学习尽可能多地清洁区域,**完全不管其他吸尘器(智能体)在做什么**。

这样做的好处是:**由于智能体之间不共享任何信息,这些吸尘器可以像训练单智能体那样进行设计和训练**。

这里的思路是:**我们的训练智能体会把其他智能体当作环境动态的一部分**,而不是当作智能体。

然而,这种技术的一大缺点是它会**使环境变得非平稳(non-stationary)**,因为当其他智能体也在环境中交互时,底层的马尔可夫决策过程会随时间发生变化。
而这对许多强化学习算法来说是个问题:**它们无法在非平稳环境中达到全局最优**。

## 集中式方案

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/centralized.png" alt="Centralized"/>
<figcaption>
来源:<a href="https://www.youtube.com/watch?v=qgb0gyrpiGk"> Introduction to Multi-Agent Reinforcement Learning </a>
</figcaption>
</figure>

在这种架构中,**我们有一个高层进程来收集所有智能体的经验**:即经验缓冲区(experience buffer)。然后,我们利用这些经验**学习一个共同的策略**。

例如,在吸尘器的例子中,观测(observation)包括:
- 吸尘器的覆盖地图。
- 所有吸尘器的位置。

我们利用这些集体经验**训练一个策略,让三台机器人作为一个整体以最有利的方式移动**。也就是说,每台机器人都从它们的共同经验中学习。
此时环境就是平稳的,因为所有智能体被视为一个更大的整体,它们知晓其他智能体策略的变化(因为那个策略与它们自己的相同)。

我们来总结一下:

- 在*去中心化方案*中,我们**把所有智能体当作独立的个体来对待,不考虑其他智能体的存在。**
  - 在这种情况下,所有智能体**把其他智能体当作环境的一部分**。
  - **这是一种非平稳的环境条件**,因此无法保证收敛。

- 在*集中式方案*中:
  - **从所有智能体的经验中学习出单一策略**。
  - 它以环境的当前状态作为输入,输出联合动作(joint actions)。
  - 奖励是全局的。
