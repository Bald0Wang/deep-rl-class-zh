> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/q-learning-recap.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/q-learning-recap.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Q-Learning 回顾


*Q-Learning* **是这样一种强化学习算法**:

- 训练一个 *Q 函数*,即一种**动作价值函数**,它在内部存储中由一张 *Q 表*编码,**这张 Q 表包含所有状态-动作对的价值**。

- 给定一个状态和一个动作,我们的 Q 函数**会在 Q 表中查找对应的价值**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-function-2.jpg" alt="Q function"  width="100%"/>

- 当训练完成后,**我们就拥有了一个最优 Q 函数,等价地,也就是一张最优 Q 表**。

- 而如果我们**拥有最优 Q 函数**,我们就拥有了最优策略,因为我们**知道每个状态下应该采取的最佳动作**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/link-value-policy.jpg" alt="Link value policy"  width="100%"/>

但一开始,**我们的 Q 表毫无用处,因为它为每个状态-动作对给出的是任意值(大多数时候我们把 Q 表初始化为 0)**。不过,随着我们不断探索环境并更新 Q 表,它会给出越来越好的近似。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit2/q-learning.jpeg" alt="q-learning.jpeg" width="100%"/>

下面就是 Q-Learning 的伪代码:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-2.jpg" alt="Q-Learning" width="100%"/>
