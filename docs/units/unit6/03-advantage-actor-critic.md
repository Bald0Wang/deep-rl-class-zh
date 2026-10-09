> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit6/advantage-actor-critic.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit6/advantage-actor-critic.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 优势 Actor-Critic(A2C)

## 用 Actor-Critic 方法降低方差

要降低 REINFORCE 算法的方差、让我们的智能体训练得更快更好,解决办法是将基于策略(Policy-Based)和基于价值(Value-Based)的方法结合起来:*Actor-Critic(演员-评论家)方法*。

要理解 Actor-Critic,可以想象你在玩一款电子游戏。你可以和一位朋友一起玩,他会给你一些反馈。你就是演员(Actor),你的朋友就是评论家(Critic)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/ac.jpg" alt="Actor Critic"/>

一开始你并不知道怎么玩,**所以你会随机尝试一些动作**。评论家观察你的动作,并**给出反馈**。

从这些反馈中学习,**你会更新自己的策略(policy),把这款游戏玩得更好**。

另一方面,你的朋友(评论家)也会改进自己给出反馈的方式,以便下次做得更好。

这就是 Actor-Critic 背后的思想。我们要学习两个函数逼近(function approximation):

- *策略*,**控制智能体(agent)的行动方式**: \( \pi_{\theta}(s) \)

- *价值函数(value function)*,通过衡量所采取动作的好坏来辅助策略更新: \( \hat{q}_{w}(s,a) \)

## Actor-Critic 的过程
看完 Actor-Critic 的整体图景之后,让我们深入了解一下:在训练过程中,演员和评论家是如何共同改进的。

如前所述,Actor-Critic 方法中有两个函数逼近(两个神经网络):
- *演员*,一个以 theta 为参数的**策略函数**: \( \pi_{\theta}(s) \)
- *评论家*,一个以 w 为参数的**价值函数**: \( \hat{q}_{w}(s,a) \)

让我们通过训练流程来理解演员和评论家是如何被优化的:
- 在每个时间步(timestep)t,我们从环境中获得当前状态 \( S_t\),并**把它作为输入传给我们的演员和评论家**。

- 我们的策略接收该状态并**输出一个动作** \( A_t \)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/step1.jpg" alt="Actor Critic 第 1 步"/>

- 评论家同时把该动作也作为输入,利用 \( S_t\) 和 \( A_t \),**计算出在该状态下采取该动作的价值:即 Q 值(Q-value)**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/step2.jpg" alt="Actor Critic 第 2 步"/>

- 在环境中执行动作 \( A_t\) 后,会输出一个新状态 \( S_{t+1}\) 和一个奖励 \( R_{t+1} \)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/step3.jpg" alt="Actor Critic 第 3 步"/>

- 演员利用 Q 值更新自己的策略参数。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/step4.jpg" alt="Actor Critic 第 4 步"/>

- 得益于更新后的参数,演员根据新状态 \( S_{t+1} \) 产生下一个要执行的动作 \( A_{t+1} \)。

- 随后,评论家更新自己的价值参数。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/step5.jpg" alt="Actor Critic 第 5 步"/>

## 在 Actor-Critic 中引入优势(A2C)
我们可以**用优势函数(Advantage function)作为评论家,来替代动作价值函数**,进一步稳定学习。

优势函数的思想是:计算某个动作相对于该状态下其他可能动作的相对优势,也就是**在该状态下采取这个动作,比该状态的平均价值要好多少**。它的计算方式是用"状态-动作"对的值减去该状态的平均值:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/advantage1.jpg" alt="优势函数"/>

换句话说,这个函数计算的是:**在该状态下采取这个动作,与在该状态下得到的平均奖励相比,我们能额外获得多少奖励**。

这部分额外奖励就是超出该状态期望值的部分。
- 如果 A(s,a) > 0:梯度就会**朝这个方向推进**。
- 如果 A(s,a) < 0(我们的动作比该状态的平均值表现得更差),**梯度就会朝相反的方向推进**。

实现这个优势函数的问题在于,它需要两个价值函数—— \( Q(s,a)\) 和 \( V(s)\)。幸运的是,**我们可以用 TD 误差(TD error)作为优势函数的优良估计器**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/advantage2.jpg" alt="优势函数"/>
