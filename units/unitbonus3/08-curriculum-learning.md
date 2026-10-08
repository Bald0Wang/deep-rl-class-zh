> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/curriculum-learning.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/curriculum-learning.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 强化学习的(自动)课程学习

虽然本课程中介绍的大多数强化学习方法在实践中效果不错,但在某些情况下,单独使用它们会失败。例如,以下情形就可能出现:

- 要学习的任务很难,需要**逐步积累技能**(例如,想让一个双足智能体(agent)学会穿越艰难障碍,它必须先学会站立,再学会行走,然后可能还要学会跳跃……)
- 环境(environment)存在变化(会影响难度),而我们希望智能体对这些变化保持**鲁棒性**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/bipedal.gif" alt="双足智能体"/>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/movable_creepers.gif" alt="可移动的爬行生物"/>
<figcaption> <a href="https://developmentalsystems.org/TeachMyAgent/">TeachMyAgent</a> </figcaption>
</figure>

在这种情况下,我们似乎需要向强化学习智能体提供不同的任务,并对它们加以组织,使智能体逐步掌握技能。这种方法被称为**课程学习(Curriculum Learning)**,通常意味着需要人工设计课程(即按特定顺序组织的一组任务)。在实践中,例如可以控制环境的生成、初始状态(state),或者使用自我对弈(Self-Play)并控制向强化学习智能体提供的对手水平。

由于设计这样的课程并非总是易事,**自动课程学习(Automatic Curriculum Learning, ACL)这一领域提出设计一些方法,通过学习来自动创建这种任务组织方式,从而最大化强化学习智能体的性能**。Portelas 等人对 ACL 给出了如下定义:

> ……一族机制,它们通过学习来调整学习情境的选择,使之适应强化学习智能体的能力,从而自动调整训练数据的分布。
>

举个例子,OpenAI 使用**域随机化(Domain Randomization)**(对环境施加随机变化)让机械手学会了复原魔方。


<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/dr.jpg" alt="域随机化"/>
<figcaption> <a href="https://openai.com/blog/solving-rubiks-cube/">OpenAI - 用机械手复原魔方(Solving Rubik's Cube with a Robot Hand)</a></figcaption>
</figure>

最后,你可以在 <a href="https://huggingface.co/spaces/flowers-team/Interactive_DeepRL_Demo">TeachMyAgent</a> 基准中体验经过训练的智能体的鲁棒性:控制环境变化,甚至亲手绘制地形 👇

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/demo.png" alt="演示"/>
<figcaption> <a href="https://huggingface.co/spaces/flowers-team/Interactive_DeepRL_Demo">https://huggingface.co/spaces/flowers-team/Interactive_DeepRL_Demo</a></figcaption>
</figure>


## 延伸阅读

想了解更多信息,我们建议你查阅以下资源:

### 领域综述

- [Automatic Curriculum Learning For Deep RL: A Short Survey](https://arxiv.org/pdf/2003.04664.pdf)
- [Curriculum for Reinforcement Learning](https://lilianweng.github.io/posts/2020-01-29-curriculum-rl/)

### 近期方法

- [Evolving Curricula with Regret-Based Environment Design](https://arxiv.org/abs/2203.01302)
- [Curriculum Reinforcement Learning via Constrained Optimal Transport](https://proceedings.mlr.press/v162/klink22a.html)
- [Prioritized Level Replay](https://arxiv.org/abs/2010.03934)

## 作者

本节内容由 <a href="https://twitter.com/ClementRomac"> Clément Romac </a> 撰写
