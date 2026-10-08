> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit5/pyramids.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit5/pyramids.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Pyramid(金字塔)环境

这个环境的目标是训练我们的智能体**拿到金字塔顶端的金砖。为此,它需要按下按钮生成金字塔(Pyramid),走向金字塔,把它推倒,然后跑到塔顶的金砖处**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids.png" alt="金字塔环境"/>


## 奖励函数

奖励函数如下:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids-reward.png" alt="金字塔环境"/>

用代码表示的话,是这样的:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids-reward-code.png" alt="金字塔奖励函数"/>

为了训练这个先寻找按钮、再寻找金字塔并将其推倒的新智能体,我们将组合使用两类奖励:

- *外在奖励(extrinsic)*:由环境给出(见上图)。
- 还有*内在奖励(intrinsic)*,叫作**好奇心(curiosity)**。第二种奖励会**促使我们的智能体保持好奇,换句话说,就是更好地探索环境**。

如果你想进一步了解好奇心,下一节(可选内容)会讲解其基础知识。

## 观测空间

在观测方面,我们**使用 148 条 raycasts,每条都能检测物体**(开关、砖块、金砖和墙壁)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids_raycasts.png"/>

我们还使用一个**指示开关状态的布尔变量**(即我们是否已打开或关闭开关来生成金字塔),以及一个**包含智能体速度**的向量。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids-obs-code.png" alt="金字塔观测代码"/>


## 动作空间

动作空间是**离散的**,有四种可能的动作:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids-action.png" alt="金字塔环境"/>
