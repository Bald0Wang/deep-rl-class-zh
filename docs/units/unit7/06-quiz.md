> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit7/quiz.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit7/quiz.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 测验

学习和[避免能力错觉](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)的最好方式**就是自我测试。**这能帮你找出**需要巩固知识的地方**。


### Q1:在比较不同类型的多智能体环境时,选出最合适的选项

- 你的智能体旨在最大化共同收益,这是 ____ 环境
- 你的智能体旨在最大化共同收益、同时最小化对手收益,这是 ____ 环境

<details markdown="1">
<summary>查看选项与解析</summary>

- ❌ 竞争、合作
  - 💡 在合作(cooperative)环境中,你最大化共同收益;而在竞争(competitive)环境中,你还以降低对手的分数为目标
- ✅ **合作、竞争**

</details>

### Q2:关于`去中心化(decentralized)`学习,以下哪些说法是正确的?

<details markdown="1">
<summary>查看选项与解析</summary>

- ✅ **每个智能体独立于其他智能体进行训练**
- ✅ **来自其他智能体的输入只是被当作环境数据**
- ❌ 把其他智能体视为环境的一部分会使环境保持平稳
  - 💡 在去中心化学习中,智能体忽略其他智能体的存在,把它们当作环境的一部分。然而,这意味着环境处于不断变化之中,变成了非平稳的。

</details>


### Q3:关于`集中式(centralized)`学习,以下哪些说法是正确的?

<details markdown="1">
<summary>查看选项与解析</summary>

- ✅ **它基于所有智能体交互中学习到的经验,学习出一个共同策略**
- ✅ **奖励是全局的**
- ✅ **采用这种方式时,环境是平稳的**

</details>

### Q4:用你自己的话解释什么是 `Self-Play`(自博弈)方法

<details markdown="1">
<summary>解答</summary>

`Self-play`(自博弈)是一种生成与你策略相同的智能体副本作为对手的方法,这样你的智能体就能从训练水平相同的智能体身上学习。

</details>

### Q5:配置 `Self-play`(自博弈)时,有几个参数非常重要。你能根据它们的定义,辨认出我们说的是哪个参数吗?

- 与当前自身对局和与对手池中的对手对局的概率
- 你可能面对的对手训练水平的多样性(离散程度)
- 生成一个新对手之前的训练步数
- 对手更换频率

<details markdown="1">
<summary>查看选项与解析</summary>

- ❌ window, play_against_latest_model_ratio, save_steps, swap_steps+team_change
- ❌ play_against_latest_model_ratio, save_steps, window, swap_steps+team_change
- ✅ **play_against_latest_model_ratio, window, save_steps, swap_steps+team_change**
- ❌ swap_steps+team_change, save_steps, play_against_latest_model_ratio, window

</details>

### Q6:使用 Elo 等级分的主要动机是什么?

<details markdown="1">
<summary>查看选项与解析</summary>

- ✅ **分数考虑了你和对手之间的技能差异**
- ✅ **尽管根据比赛结果和双方智能体的水平,交换的分数可能更多,但总数始终不变**
- ❌ 智能体很容易保持高等级分
  - 💡 这叫做`等级分通缩(Rating deflation)`:长期保持高等级分需要非常高的技艺
- ❌ 它能很好地计算团队中每个玩家的个体贡献
  - 💡 ELO 使用的是整支队伍取得的成绩,但不会计算个体贡献

</details>

恭喜你完成本测验 🥳,如果你漏掉了一些要点,花点时间重读本章,来(😏)巩固你的知识。
