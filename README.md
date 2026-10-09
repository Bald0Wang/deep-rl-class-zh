# Hugging Face Deep RL 课程中文翻译 🤗

> **🌐 在线阅读:[https://bald0wang.github.io/deep-rl-class-zh/](https://bald0wang.github.io/deep-rl-class-zh/)**

> 本项目是 [Hugging Face Deep Reinforcement Learning Course](https://huggingface.co/learn/deep-rl-course) 的简体中文翻译,基于官方源码仓库 [huggingface/deep-rl-class](https://github.com/huggingface/deep-rl-class) 翻译而成。译文由 AI 生成、经人工整理,仅供学习交流;原课程以 [Apache-2.0](./LICENSE.md) 许可发布,版权归原作者所有,译文同样以 Apache-2.0 许可发布。

![License](https://img.shields.io/badge/license-Apache--2.0-blue) ![Pages](https://img.shields.io/badge/%E7%BF%BB%E8%AF%91%E9%A1%B5%E9%9D%A2-114-success) ![Course](https://img.shields.io/badge/%E5%8D%95%E5%85%83-9%20%E6%AD%A3%E5%BC%8F%20%2B%203%20%E9%99%84%E5%8A%A0-orange)

---

## 这门课是什么?

深度强化学习(Deep RL)是人工智能中最迷人的领域之一:AlphaGo、Atari 游戏、机器人控制、大模型对齐(RLHF)背后都有它的身影。

本课程由 Hugging Face 团队出品,特点是**理论 + 实战结合**:

- 📖 **理论部分**:每个单元由浅入深讲解一个核心算法,配大量图示;
- 🛠️ **实战部分**:每个单元配套 Google Colab 笔记本,使用 Stable-Baselines3、RL Baselines3 Zoo、Sample Factory、CleanRL、Unity ML-Agents 等主流库训练智能体;
- 🏆 **实践作业**:训练自己的智能体(月球着陆器、雪球战、足球队、Huggy 机器狗……),上传到 Hugging Face Hub 与同学互相评分;
- 🎓 完成全部单元可获得[结业证书](./docs/appendix/02-certification.md)。

课程共 **9 个正式单元 + 3 个附加单元**,每个单元约需 1 周、每周 3-4 小时。

## 在线阅读与本地部署

- 🌐 **在线阅读**:https://bald0wang.github.io/deep-rl-class-zh/(由 GitHub Actions 自动构建部署)
- 💻 本地预览:`pip install mkdocs-material && mkdocs serve`,然后打开 http://127.0.0.1:8000

## 快速开始

1. 先阅读 [Unit 0 · 欢迎来到课程](./docs/units/unit0/01-introduction.md) 与 [环境配置](./docs/units/unit0/02-setup.md);
2. 按下方目录顺序学习,每个单元先读理论页,再到**动手实践**页进入 Colab 运行代码;
3. 配套代码在本仓库 [notebooks/](./notebooks/) 目录 —— **Markdown 说明与代码注释均为中文**(代码与官方逐字一致);也可直接使用[官方 Colab 版](https://github.com/huggingface/deep-rl-class/tree/main/notebooks)在线运行。

## 课程目录

### Unit 0 · 欢迎来到课程

| # | 页面 |
|---|------|
| 01 | [欢迎来到课程 🤗](./docs/units/unit0/01-introduction.md) |
| 02 | [环境配置(Setup)](./docs/units/unit0/02-setup.md) |
| 03 | [Discord 入门](./docs/units/unit0/03-discord101.md) |

### Unit 1 · 深度强化学习入门

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit1/01-introduction.md) |
| 02 | [什么是强化学习?](./docs/units/unit1/02-what-is-rl.md) |
| 03 | [强化学习框架](./docs/units/unit1/03-rl-framework.md) |
| 04 | [任务的类型](./docs/units/unit1/04-tasks.md) |
| 05 | [探索与利用的权衡](./docs/units/unit1/05-exp-exp-tradeoff.md) |
| 06 | [解决 RL 问题的两大方法](./docs/units/unit1/06-two-methods.md) |
| 07 | [深度强化学习中的「深度」](./docs/units/unit1/07-deep-rl.md) |
| 08 | [本章小结](./docs/units/unit1/08-summary.md) |
| 09 | [术语表](./docs/units/unit1/09-glossary.md) |
| 10 | [动手实践:训练你的第一个深度强化学习智能体 🤖](./docs/units/unit1/10-hands-on.md) |
| 11 | [测验](./docs/units/unit1/11-quiz.md) |
| 12 | [结语](./docs/units/unit1/12-conclusion.md) |
| 13 | [延伸阅读](./docs/units/unit1/13-additional-readings.md) |

### Bonus Unit 1 · 和机器狗 Huggy 一起入门深度强化学习

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unitbonus1/01-introduction.md) |
| 02 | [Huggy 是如何工作的?](./docs/units/unitbonus1/02-how-huggy-works.md) |
| 03 | [训练 Huggy](./docs/units/unitbonus1/03-train.md) |
| 04 | [和 Huggy 一起玩](./docs/units/unitbonus1/04-play.md) |
| 05 | [结语](./docs/units/unitbonus1/05-conclusion.md) |

### Unit 2 · Q-Learning 入门

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit2/01-introduction.md) |
| 02 | [什么是强化学习?简要回顾](./docs/units/unit2/02-what-is-rl.md) |
| 03 | [两种基于价值的方法](./docs/units/unit2/03-two-types-value-based-methods.md) |
| 04 | [贝尔曼方程:简化价值估计](./docs/units/unit2/04-bellman-equation.md) |
| 05 | [蒙特卡洛与时序差分学习](./docs/units/unit2/05-mc-vs-td.md) |
| 06 | [阶段小结](./docs/units/unit2/06-mid-way-recap.md) |
| 07 | [阶段测验](./docs/units/unit2/07-mid-way-quiz.md) |
| 08 | [认识 Q-Learning](./docs/units/unit2/08-q-learning.md) |
| 09 | [一个 Q-Learning 的例子](./docs/units/unit2/09-q-learning-example.md) |
| 10 | [Q-Learning 回顾](./docs/units/unit2/10-q-learning-recap.md) |
| 11 | [术语表](./docs/units/unit2/11-glossary.md) |
| 12 | [动手实践:用 Q-Learning 玩 FrozenLake ⛄ 和 Taxi 🚕](./docs/units/unit2/12-hands-on.md) |
| 13 | [Q-Learning 测验](./docs/units/unit2/13-quiz2.md) |
| 14 | [结语](./docs/units/unit2/14-conclusion.md) |
| 15 | [延伸阅读](./docs/units/unit2/15-additional-readings.md) |

### Unit 3 · 用 Atari 游戏学 Deep Q-Learning

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit3/01-introduction.md) |
| 02 | [从 Q-Learning 到 Deep Q-Learning](./docs/units/unit3/02-from-q-to-dqn.md) |
| 03 | [深度 Q 网络(DQN)](./docs/units/unit3/03-deep-q-network.md) |
| 04 | [Deep Q 算法](./docs/units/unit3/04-deep-q-algorithm.md) |
| 05 | [术语表](./docs/units/unit3/05-glossary.md) |
| 06 | [动手实践:用 RL Baselines3 Zoo 在 Atari 游戏 👾 上训练 DQN](./docs/units/unit3/06-hands-on.md) |
| 07 | [测验](./docs/units/unit3/07-quiz.md) |
| 08 | [结语](./docs/units/unit3/08-conclusion.md) |
| 09 | [延伸阅读](./docs/units/unit3/09-additional-readings.md) |

### Bonus Unit 2 · 用 Optuna 自动超参数调优

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unitbonus2/01-introduction.md) |
| 02 | [Optuna](./docs/units/unitbonus2/02-optuna.md) |
| 03 | [动手实践](./docs/units/unitbonus2/03-hands-on.md) |

### Unit 4 · 用 PyTorch 实现策略梯度(Policy Gradient)

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit4/01-introduction.md) |
| 02 | [什么是策略方法?](./docs/units/unit4/02-what-are-policy-based-methods.md) |
| 03 | [策略梯度方法的优缺点](./docs/units/unit4/03-advantages-disadvantages.md) |
| 04 | [深入理解策略梯度](./docs/units/unit4/04-policy-gradient.md) |
| 05 | [(可选)策略梯度定理](./docs/units/unit4/05-pg-theorem.md) |
| 06 | [术语表](./docs/units/unit4/06-glossary.md) |
| 07 | [动手实践:用 PyTorch 编写 Reinforce 并测试鲁棒性 💪](./docs/units/unit4/07-hands-on.md) |
| 08 | [测验](./docs/units/unit4/08-quiz.md) |
| 09 | [结语](./docs/units/unit4/09-conclusion.md) |
| 10 | [延伸阅读](./docs/units/unit4/10-additional-readings.md) |

### Unit 5 · Unity ML-Agents 入门

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit5/01-introduction.md) |
| 02 | [ML-Agents 是如何工作的?](./docs/units/unit5/02-how-mlagents-works.md) |
| 03 | [SnowballTarget 环境](./docs/units/unit5/03-snowball-target.md) |
| 04 | [Pyramids 环境](./docs/units/unit5/04-pyramids.md) |
| 05 | [(可选)什么是深度强化学习中的好奇心?](./docs/units/unit5/05-curiosity.md) |
| 06 | [动手实践:ML-Agents 入门,训练雪球智能体](./docs/units/unit5/06-hands-on.md) |
| 07 | [附加内容:用 Unity 和 ML-Agents 创建你自己的环境](./docs/units/unit5/07-bonus.md) |
| 08 | [测验](./docs/units/unit5/08-quiz.md) |
| 09 | [结语](./docs/units/unit5/09-conclusion.md) |

### Unit 6 · Actor-Critic 方法与机器人环境

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit6/01-introduction.md) |
| 02 | [REINFORCE 的方差问题](./docs/units/unit6/02-variance-problem.md) |
| 03 | [优势 Actor-Critic(A2C)](./docs/units/unit6/03-advantage-actor-critic.md) |
| 04 | [动手实践:用 Panda-Gym 机器人仿真训练 A2C 🤖](./docs/units/unit6/04-hands-on.md) |
| 05 | [测验](./docs/units/unit6/05-quiz.md) |
| 06 | [结语](./docs/units/unit6/06-conclusion.md) |
| 07 | [延伸阅读](./docs/units/unit6/07-additional-readings.md) |

### Unit 7 · 多智能体与 AI vs AI 入门

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit7/01-introduction.md) |
| 02 | [多智能体强化学习(MARL)入门](./docs/units/unit7/02-introduction-to-marl.md) |
| 03 | [设计多智能体系统](./docs/units/unit7/03-multi-agent-setting.md) |
| 04 | [自博弈(Self-Play)](./docs/units/unit7/04-self-play.md) |
| 05 | [动手实践:训练足球队击败同学的队伍](./docs/units/unit7/05-hands-on.md) |
| 06 | [测验](./docs/units/unit7/06-quiz.md) |
| 07 | [结语](./docs/units/unit7/07-conclusion.md) |
| 08 | [延伸阅读](./docs/units/unit7/08-additional-readings.md) |

### Unit 8 · Part 1 近端策略优化(PPO)

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unit8/01-introduction.md) |
| 02 | [PPO 背后的直觉](./docs/units/unit8/02-intuition-behind-ppo.md) |
| 03 | [认识裁剪代理目标函数(Clipped Surrogate Objective)](./docs/units/unit8/03-clipped-surrogate-objective.md) |
| 04 | [可视化裁剪代理目标函数](./docs/units/unit8/04-visualize.md) |
| 05 | [实战:用 CleanRL 训练 PPO](./docs/units/unit8/05-hands-on-cleanrl.md) |
| 06 | [结语](./docs/units/unit8/06-conclusion.md) |
| 07 | [延伸阅读](./docs/units/unit8/07-additional-readings.md) |

### Unit 8 · Part 2 用 Sample Factory 和 Doom 训练 PPO

| # | 页面 |
|---|------|
| 08 | [引言](./docs/units/unit8/08-introduction-sf.md) |
| 09 | [实战:用 Sample Factory 和 Doom 训练 PPO](./docs/units/unit8/09-hands-on-sf.md) |
| 10 | [结语](./docs/units/unit8/10-conclusion-sf.md) |

### Bonus Unit 3 · 强化学习进阶专题

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unitbonus3/01-introduction.md) |
| 02 | [基于模型的强化学习](./docs/units/unitbonus3/02-model-based.md) |
| 03 | [离线 vs 在线强化学习](./docs/units/unitbonus3/03-offline-online.md) |
| 04 | [强化学习的泛化](./docs/units/unitbonus3/04-generalisation.md) |
| 05 | [基于人类反馈的强化学习(RLHF)](./docs/units/unitbonus3/05-rlhf.md) |
| 06 | [Decision Transformer 与离线 RL](./docs/units/unitbonus3/06-decision-transformers.md) |
| 07 | [强化学习中的语言模型](./docs/units/unitbonus3/07-language-models.md) |
| 08 | [(自动)课程学习](./docs/units/unitbonus3/08-curriculum-learning.md) |
| 09 | [值得一试的有趣环境](./docs/units/unitbonus3/09-envs-to-try.md) |
| 10 | [Unreal Learning Agents 入门](./docs/units/unitbonus3/10-learning-agents.md) |
| 11 | [Godot RL 入门](./docs/units/unitbonus3/11-godotrl.md) |
| 12 | [学生项目](./docs/units/unitbonus3/12-student-works.md) |
| 13 | [强化学习文档简介](./docs/units/unitbonus3/13-rl-documentation.md) |

### Bonus Unit 5 · 用 Godot RL Agents 进行模仿学习

| # | 页面 |
|---|------|
| 01 | [引言](./docs/units/unitbonus5/01-introduction.md) |
| 02 | [环境介绍](./docs/units/unitbonus5/02-the-environment.md) |
| 03 | [快速上手](./docs/units/unitbonus5/03-getting-started.md) |
| 04 | [训练我们的机器人](./docs/units/unitbonus5/04-train-our-robot.md) |
| 05 | [(可选)自定义环境](./docs/units/unitbonus5/05-customize-the-environment.md) |
| 06 | [结语](./docs/units/unitbonus5/06-conclusion.md) |

### 附录

| # | 页面 |
|---|------|
| 01 | [恭喜结课 🎉](./docs/appendix/01-congratulations.md) |
| 02 | [获取结业证书](./docs/appendix/02-certification.md) |
| 03 | [直播 1:课程工作机制、问答、与 Huggy 一起玩 🐶](./docs/appendix/03-live1.md) |

## 配套代码(中文注释版) 📓

官方课程的 Colab 笔记本已收录在本仓库 [notebooks/](./notebooks/) 目录:Markdown 说明单元格与代码注释均已译为中文,代码本身与官方原版逐字一致(经 token 级校验)。各笔记本对应的单元与内容简介见 [notebooks/README.md](./notebooks/README.md)。

| 笔记本 | 内容 |
|--------|------|
| [unit1](./notebooks/unit1/unit1.ipynb) | Stable-Baselines3 训练月球着陆器 + 上传 Hub |
| [unit2](./notebooks/unit2/unit2.ipynb) | 从零实现 Q-Learning(FrozenLake、Taxi) |
| [unit3](./notebooks/unit3/unit3.ipynb) | RL Baselines3 Zoo 训练太空侵略者 DQN |
| [unit4](./notebooks/unit4/unit4.ipynb) | PyTorch 从零实现 REINFORCE |
| [unit5](./notebooks/unit5/unit5.ipynb) | ML-Agents 训练雪球靶 |
| [unit6](./notebooks/unit6/unit6.ipynb) | Panda-Gym 训练 A2C 机械臂 |
| [unit8](./notebooks/unit8/) | CleanRL PPO;Sample Factory + Doom(两部分) |
| [bonus-unit1](./notebooks/bonus-unit1/) | 训练机器狗 Huggy |

## 术语对照表

翻译中统一采用以下术语(首次出现时附英文原文):

| 英文 | 中文 |
|------|------|
| agent | 智能体 |
| environment | 环境 |
| state / observation | 状态 / 观测 |
| action / action space | 动作 / 动作空间 |
| reward | 奖励 |
| policy | 策略 |
| return | 回报 |
| value function / Q-function | 价值函数 / Q 函数 |
| episode / trajectory | 回合 / 轨迹 |
| discount factor | 折扣因子 |
| exploration / exploitation | 探索 / 利用 |
| Bellman equation | 贝尔曼方程 |
| Monte Carlo / Temporal Difference | 蒙特卡洛 / 时序差分 |
| on-policy / off-policy | 在策略 / 离策略 |
| Q-Learning / DQN / PPO / A2C | 保留英文 |
| policy gradient | 策略梯度 |
| advantage function | 优势函数 |
| Actor-Critic | Actor-Critic(演员-评论家) |
| replay buffer / target network | 经验回放缓冲区 / 目标网络 |
| self-play | 自博弈 |
| curriculum learning | 课程学习 |
| imitation learning | 模仿学习 |
| RLHF | 基于人类反馈的强化学习 |

其余未列入的术语采用通行中文译法、首次出现附英文;环境名(如 Frozen Lake)、库名(如 Stable-Baselines3)与代码一律保留英文。

## 译文约定

- 每篇译文开头都附有指向官方源文件的原文链接,便于对照;
- 代码块中的代码、命令行、API 名保持原样,代码注释译为中文;
- 数学公式(LaTeX)保持原样;
- 图片与视频沿用原课程的官方链接;
- 每个单元的页面按官方学习顺序以 `NN-` 数字前缀命名;
- 原版测验(Quiz)为交互式组件,译文以静态文本呈现问题与解析。

## 致谢与许可

- 原课程:**[Hugging Face Deep Reinforcement Learning Course](https://huggingface.co/learn/deep-rl-course)**,作者 [Thomas Simonini](https://huggingface.co/thomassimonini) 及 Hugging Face 社区贡献者;
- 官方源码仓库:[huggingface/deep-rl-class](https://github.com/huggingface/deep-rl-class);
- 原课程与本项目均以 [Apache License 2.0](./LICENSE.md) 发布。

> ⚠️ 译文由 AI 辅助生成,虽经校对仍可能存在偏差。发现翻译问题欢迎提 Issue 或 Pull Request;如需最准确的内容,请以英文原版为准。
