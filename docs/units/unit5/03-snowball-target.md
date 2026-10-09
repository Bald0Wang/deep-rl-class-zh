> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit5/snowball-target.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit5/snowball-target.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# SnowballTarget(雪球靶)环境

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballtarget.gif" alt="SnowballTarget"/>

SnowballTarget(雪球靶)是我们在 Hugging Face 使用 [Kay Lousberg](https://kaylousberg.com/) 的素材资源创建的一个环境。如果你想学习使用 Unity 并创建自己的环境,本单元末尾有一个可选章节供你学习。

## 智能体的目标

你要训练的第一个智能体是一头名叫 Julien 的熊 🐻。Julien 的训练目标是**用雪球击中靶子**。

这个环境中的目标是让 Julien **在有限时间(1000 个时间步,timesteps)内尽可能多地击中靶子**。为此,它需要**相对靶子调整好自身位置,然后开火射击**。

此外,为了避免"疯狂刷雪球"(即每个时间步都发射一颗雪球),**Julien 有一个"冷却(cool off)"机制**(每次射击后需要等待 0.5 秒才能再次射击)。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/cooloffsystem.gif" alt="冷却机制"/>
<figcaption>智能体需要等待 0.5 秒才能再次发射雪球</figcaption>
</figure>

## 奖励函数与奖励工程问题

奖励函数很简单:**智能体的雪球每击中一个靶子,环境就给予 +1 奖励**。由于智能体的目标就是最大化期望累积奖励,**它会尽力击中尽可能多的靶子**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballtarget_reward.png" alt="奖励机制"/>

我们本可以设计更复杂的奖励函数(比如加入惩罚,促使智能体动作更快)。但在设计环境时,你需要避免*奖励工程问题(reward engineering problem)*,即奖励函数设计得过于复杂,强行让智能体按照你期望的方式行动。
为什么?因为这样一来,**你可能会错过智能体在更简单的奖励函数下发现的有意思的策略**。

用代码表示的话,是这样的:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballtarget-reward-code.png" alt="奖励"/>


## 观测空间

在观测方面,我们没有使用普通的视觉(画面帧),而是**使用射线检测(raycasts)**。

可以把 raycasts 想象成一道道激光,用来检测它们是否穿过了某个物体。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/raycasts.png" alt="Raycasts"/>
<figcaption>来源:<a href="https://github.com/Unity-Technologies/ml-agents">ML-Agents 文档</a></figcaption>
</figure>


在这个环境中,我们的智能体拥有多组 raycasts:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowball_target_raycasts.png" alt="Raycasts"/>

除了 raycasts,智能体还以一个"能否射击"的布尔值作为观测。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballtarget-obs-code.png" alt="观测"/>

## 动作空间

动作空间是离散的:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballtarget_action_space.png" alt="动作空间"/>
