> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus1/play.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus1/play.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 和 Huggy 一起玩

现在你已经训练好了 Huggy,并把它推送到了 Hub。**接下来你就可以和它一起玩了 ❤️**

这一步很简单:

- 在浏览器中打开 Huggy 游戏:https://huggingface.co/spaces/ThomasSimonini/Huggy
- 点击 Play with my Huggy model

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/load-huggy.jpg" alt="load-huggy" width="100%">

1. 在第 1 步,选择你的模型仓库,也就是模型 id(以我为例是 ThomasSimonini/ppo-Huggy)。

2. 在第 2 步,**选择你想回放的模型**:
  - 我这里有多个模型,因为我们每 500000 个时间步(timestep)保存一次模型。
  - 但如果我想要最新的那个,我就选择 Huggy.onnx

👉 多**尝试不同的模型检查点(checkpoint),观察智能体的进步**,这是很有益的。
