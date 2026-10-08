> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/envs-to-try.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/envs-to-try.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 值得一试的有趣环境

在这里,我们列出了一些有趣的环境(environment),你可以尝试用它们来训练你的智能体(agent):

## DIAMBRA Arena

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/diambraarena.png" alt="diambraArena"/>


DIAMBRA Arena 是一个软件包,收录了一系列面向强化学习研究与实验的高质量环境。它为流行的街机模拟游戏提供了标准接口,提供完全符合 OpenAI Gym/Gymnasium 格式的 Python API,让你能够平滑、直接地上手。

它支持所有主流操作系统(Linux、Windows 和 MacOS),可以通过 [Python PIP](https://pypi.org/project/diambra-arena/) 轻松安装。它完全免费使用,用户只需在[官方网站](https://diambra.ai/register/)注册即可。

此外,它的 [GitHub 仓库](https://github.com/diambra/)提供了一组示例,覆盖了主要的使用场景,只需几步即可运行。

#### 主要特性

所有环境都是回合制(episodic)的强化学习任务,动作(action)为离散动作(手柄按键),观测由屏幕像素加上额外的数值数据组成(RAM 值,例如角色的血条、角色所处的舞台一侧等)。

它们同时支持单人(1P)和双人(2P)模式,是探索标准强化学习、竞争性多智能体、人与智能体对抗、自我对弈(Self-Play)、模仿学习以及人在环路(Human-in-the-Loop)的绝佳资源。

[接入的游戏](https://docs.diambra.ai/envs/games/)都是从最受欢迎的复古格斗游戏中挑选出来的。虽然它们共享相同的基本机制,但各自提供了不同的挑战,并带有各自的特点,例如角色的类型和数量不同、连招(combo)的发动方式不同、血条是否可以回复,等等。

DIAMBRA Arena 的设计目标是与所有主流强化学习库最大程度兼容。它原生提供了与两个最重要的软件包的接口:[Stable Baselines 3](https://stable-baselines3.readthedocs.io/en/master/) 和 [Ray RLlib](https://docs.ray.io/en/latest/rllib/index.html),Stable Baselines(旧版)同样可用但已被弃用。它们的使用方法在[官方文档](https://docs.diambra.ai/)和 [DIAMBRA Agents 示例仓库](https://github.com/diambra/agents)中都有说明。用类似的方式,它也可以轻松接入任何其他软件包。

### 竞赛平台

DIAMBRA 还提供了一个与 Hugging Face Hub 完全集成的竞赛平台,你可以在上面提交训练好的智能体,与全球其他程序员在精彩的电子游戏锦标赛中一较高下!

平台设有公开排行榜,用户根据其智能体在各个环境中取得的最佳成绩进行排名。

根据你智能体的表现,还可以解锁炫酷的成就。

提交的智能体会被评估,其对局过程会在 [DIAMBRA Twitch 频道](https://www.twitch.tv/diambra_ai)上直播。

#### 参考资料

要开始使用这个环境,请查阅以下资源:
- [官方文档](https://docs.diambra.ai/)
- [竞赛平台](https://diambra.ai)
- [GitHub](https://github.com/diambra/)
- [Discord](https://diambra.ai/discord)

## MineRL

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/minerl.jpg" alt="MineRL"/>


MineRL 是一个 Python 库,提供了与游戏 Minecraft(我的世界)交互的 Gym 接口,并附带人类游戏玩法的数据集。
该库每年都会举办挑战赛,详情请查看[网站](https://minerl.io/)。

要开始使用这个环境,请查阅以下资源:
- [什么是 MineRL?](https://www.youtube.com/watch?v=z6PTrGifupU)
- [MineRL 初步上手](https://www.youtube.com/watch?v=8yIrWcyWGek)
- [MineRL 文档与教程](https://minerl.readthedocs.io/en/latest/)

## DonkeyCar Simulator(DonkeyCar 模拟器)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/donkeycar.jpg" alt="Donkey Car"/>
Donkey 是一个面向业余遥控车的自动驾驶平台。
这个模拟器版本构建在 Unity 游戏平台之上,使用 Unity 自带的物理与图形系统,并连接到一个 donkey Python 进程,用我们训练好的模型来控制模拟的 Donkey(小车)。


要开始使用这个环境,请查阅以下资源:
- [DonkeyCar Simulator 文档](https://docs.donkeycar.com/guide/deep_learning/simulator/)
- [学习平稳驾驶(Antonin Raffin 的教程)第 1 部分](https://www.youtube.com/watch?v=ngK33h00iBE)
- [学习平稳驾驶(Antonin Raffin 的教程)第 2 部分](https://www.youtube.com/watch?v=DUqssFvcSOY)
- [学习平稳驾驶(Antonin Raffin 的教程)第 3 部分](https://www.youtube.com/watch?v=v8j2bpcE4Rg)

- 预训练智能体:
  - https://huggingface.co/araffin/tqc-donkey-mountain-track-v0
  - https://huggingface.co/araffin/tqc-donkey-avc-sparkfun-v0
  - https://huggingface.co/araffin/tqc-donkey-minimonaco-track-v0


## Starcraft II(星际争霸 2)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/alphastar.jpg" alt="Alphastar"/>

Starcraft II 是一款著名的*即时战略游戏*。DeepMind 曾用这款游戏开展深度强化学习研究,打造了 [Alphastar](https://www.deepmind.com/blog/alphastar-mastering-the-real-time-strategy-game-starcraft-ii)。

要开始使用这个环境,请查阅以下资源:
- [Starcraft gym](http://starcraftgym.com/)
- [AI 学会玩星际争霸 2(强化学习)教程](https://www.youtube.com/watch?v=q59wap1ELQ4)

## 作者

本节内容由 <a href="https://twitter.com/ThomasSimonini"> Thomas Simonini</a> 撰写
