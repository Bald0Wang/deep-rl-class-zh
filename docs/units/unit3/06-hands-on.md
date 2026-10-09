> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit3/hands-on.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit3/hands-on.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 动手练习



      > 📓 本单元配套笔记本:[Google Colab](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/notebooks/unit3/unit3.ipynb) · [Discord 求助](http://hf.co/join/discord)


既然你已经学习了深度 Q 学习背后的理论,**你已经准备好训练自己的深度 Q 学习智能体去玩 Atari 游戏了**。我们将从 Space Invaders(太空侵略者)开始,但你可以使用任何你想要的 Atari 游戏 🔥

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/atari-envs.gif" alt="环境"/>


我们使用的是 [RL-Baselines-3 Zoo 集成](https://github.com/DLR-RM/rl-baselines3-zoo),即深度 Q 学习的原始版本(vanilla),不包含 Double-DQN、Dueling-DQN 或优先经验回放(Prioritized Experience Replay)等扩展。

另外,**如果你想在这次动手练习之后学会自己实现深度 Q 学习**,你绝对应该看看 CleanRL 的实现:https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/dqn_atari.py

要在认证流程中通过这次动手练习,你需要把训练好的模型推送到 Hub,并**取得 >= 200 的成绩**。

要查看你的成绩,请前往排行榜并找到你的模型,**成绩 = mean_reward - std of reward**(平均奖励 - 奖励标准差)。

**如果你找不到自己的模型,请到页面底部点击刷新按钮。**

有关认证流程的更多信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

你可以在这里查看自己的进度 👉 https://huggingface.co/spaces/ThomasSimonini/Check-my-progress-Deep-RL-Course


**要开始动手练习,请点击 Open In Colab 按钮** 👇 :

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/unit3/unit3.ipynb)

# 第 3 单元:使用 RL Baselines3 Zoo 在 Atari 游戏 👾 上进行深度 Q 学习

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/thumbnail.jpg" alt="第 3 单元缩略图">

在这次动手练习中,**你将训练一个深度 Q 学习智能体**,使用 [RL Baselines3 Zoo](https://github.com/DLR-RM/rl-baselines3-zoo) 玩 Space Invaders(太空侵略者)。RL Baselines3 Zoo 是一个基于 [Stable-Baselines3](https://stable-baselines3.readthedocs.io/en/master/) 的训练框架,提供了用于训练、评估智能体、调优超参数、绘制结果图表和录制视频的脚本。

我们使用的是 [RL-Baselines-3 Zoo 集成,即深度 Q 学习的原始版本](https://stable-baselines3.readthedocs.io/en/master/modules/dqn.html),不包含 Double-DQN、Dueling-DQN 和优先经验回放等扩展。

### 🎮 环境:

- [SpaceInvadersNoFrameskip-v4](https://gymnasium.farama.org/environments/atari/space_invaders/)

你可以在这里查看 Space Invaders 各个版本之间的区别 👉 https://gymnasium.farama.org/environments/atari/space_invaders/#variants

### 📚 RL 库:

- [RL-Baselines3-Zoo](https://github.com/DLR-RM/rl-baselines3-zoo)

## 本次动手练习的目标 🏆

在动手练习结束时,你将:
- 能够更深入地理解 **RL Baselines3 Zoo 的工作原理**。
- 能够**把你训练好的智能体和代码推送到 Hub**,并附带一段精美的回放视频和评估分数 🔥。

## 前置要求 🏗️

在开始动手练习之前,你需要:

🔲 📚 **[通过阅读第 3 单元学习深度 Q 学习](https://huggingface.co/deep-rl-course/unit3/introduction)**  🤗

我们一直在努力改进教程,所以**如果你在这次动手练习中发现了一些问题**,请[在 Github 仓库上提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

# 让我们训练一个玩 Atari 游戏 Space Invaders 👾 的深度 Q 学习智能体,并把它上传到 Hub。

我们强烈建议学生**在动手练习中使用 Google Colab,而不是在自己的个人电脑上运行**。

使用 Google Colab,**你可以专注于学习和实验,而无需为环境搭建等技术细节操心**。

要在认证流程中通过这次动手练习,你需要把训练好的模型推送到 Hub,并**取得 >= 200 的成绩**。

要查看你的成绩,请前往排行榜并找到你的模型,**成绩 = mean_reward - std of reward**。

有关认证流程的更多信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

## 设置 GPU 💪

- 为了**加速智能体的训练,我们将使用 GPU**。为此,请前往 `Runtime > Change Runtime type`(运行时 > 更改运行时类型)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step1.jpg" alt="GPU 步骤 1">

- `Hardware Accelerator > GPU`(硬件加速器 > GPU)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step2.jpg" alt="GPU 步骤 2">

# 安装 RL-Baselines3 Zoo 及其依赖 📚

如果你看到 `ERROR: pip's dependency resolver does not currently take into account all the packages that are installed.`,**这是正常现象,不是严重错误**,只是存在版本冲突。但我们需要安装的软件包已经安装好了。

```python
# 目前我们安装的是这一更新版本的 RL-Baselines3 Zoo
pip install git+https://github.com/DLR-RM/rl-baselines3-zoo
```

```bash
apt-get install swig cmake ffmpeg
```

为了能在 Gymnasium 中使用 Atari 游戏,我们需要安装 atari 软件包,以及 accept-rom-license,用于下载 rom 文件(游戏文件)。

```python
!pip install gymnasium[atari]
!pip install gymnasium[accept-rom-license]
```

## 创建虚拟显示器 🔽

在动手练习过程中,我们需要生成回放视频。为此,如果你在无显示器(headless)的机器上训练,**我们就需要一个虚拟屏幕来渲染环境**(从而录制帧)。

因此,下面的代码单元将安装所需的库,并创建和运行一个虚拟屏幕 🖥

```bash
apt install python-opengl
apt install ffmpeg
apt install xvfb
pip3 install pyvirtualdisplay
```

```python
# 虚拟显示器
from pyvirtualdisplay import Display

virtual_display = Display(visible=0, size=(1400, 900))
virtual_display.start()
```

## 训练我们的深度 Q 学习智能体来玩 Space Invaders 👾

使用 RL-Baselines3-Zoo 训练智能体,我们只需要做两件事:

1. 创建一个超参数配置文件,包含我们的训练超参数,命名为 `dqn.yml`。

这是一个模板示例:

```
SpaceInvadersNoFrameskip-v4:
  env_wrapper:
    - stable_baselines3.common.atari_wrappers.AtariWrapper
  frame_stack: 4
  policy: 'CnnPolicy'
  n_timesteps: !!float 1e7
  buffer_size: 100000
  learning_rate: !!float 1e-4
  batch_size: 32
  learning_starts: 100000
  target_update_interval: 1000
  train_freq: 4
  gradient_steps: 1
  exploration_fraction: 0.1
  exploration_final_eps: 0.01
  # 如果为 True,你需要在 replay_buffer_kwargs 中
  # 禁用 handle_timeout_termination
  optimize_memory_usage: False
```

从这里我们可以看到:
- 我们使用了 `Atari Wrapper`,它对输入进行预处理(缩小帧、灰度化、叠加 4 帧)
- 我们使用 `CnnPolicy`,因为我们使用卷积层来处理帧
- 我们训练 1000 万个 `n_timesteps`(时间步)
- 记忆(经验回放)大小为 100000,即你保存下来的经验步数,供之后再次训练智能体使用。

💡 我的建议是**把训练时间步减少到 100 万**,这在 P100 上大约需要 90 分钟。`!nvidia-smi` 会告诉你正在使用哪种 GPU。如果是 1000 万步,大约需要 9 个小时。我建议在本地计算机(或其他地方)上运行。只需点击:`File>Download`。

在超参数优化方面,我的建议是重点关注以下 3 个超参数:
- `learning_rate`(学习率)
- `buffer_size`(经验记忆大小)
- `batch_size`(批大小)

作为一个好习惯,你需要**查阅文档来理解每个超参数的作用**:https://stable-baselines3.readthedocs.io/en/master/modules/dqn.html#parameters



2. 我们开始训练,并把模型保存到 `logs` 文件夹 📁

- 在 `--algo` 之后定义算法,在 `-f` 之后指定模型保存位置,在 `-c` 之后指定超参数配置文件。

```bash
python -m rl_zoo3.train --algo ________ --env SpaceInvadersNoFrameskip-v4  -f _________  -c _________
```

#### 解答

```bash
python -m rl_zoo3.train --algo dqn  --env SpaceInvadersNoFrameskip-v4 -f logs/ -c dqn.yml
```

## 让我们评估我们的智能体 👀

- RL-Baselines3-Zoo 提供了 `enjoy.py`,一个用于评估智能体的 Python 脚本。在大多数 RL 库中,评估脚本都叫 `enjoy.py`。
- 让我们评估 5000 个时间步 🔥

```bash
python -m rl_zoo3.enjoy  --algo dqn  --env SpaceInvadersNoFrameskip-v4  --no-render  --n-timesteps _________  --folder logs/
```

#### 解答

```bash
python -m rl_zoo3.enjoy  --algo dqn  --env SpaceInvadersNoFrameskip-v4  --no-render  --n-timesteps 5000  --folder logs/
```

## 把我们训练好的模型发布到 Hub 🚀
现在我们已经看到训练之后取得了不错的结果,可以用一行代码把我们训练好的模型发布到 Hub 🤗。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit3/space-invaders-model.gif" alt="Space Invaders 模型">

通过使用 `rl_zoo3.push_to_hub`,**你可以进行评估、录制回放视频、为你的智能体生成模型卡(model card),并把它推送到 Hub**。

这样一来:
- 你可以**展示自己的成果** 🔥
- 你可以**观看你的智能体的游玩过程** 👀
- 你可以**与社区分享一个其他人也能使用的智能体** 💾
- 你可以**访问排行榜 🏆,看看你的智能体与同学们相比表现如何** 👉  https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard

要与社区分享你的模型,还需要完成以下三个步骤:

1️⃣ (如果还没有的话)注册一个 HF 账号 ➡ https://huggingface.co/join

2️⃣ 登录之后,你需要保存来自 Hugging Face 网站的认证令牌(token)。
- 创建一个新令牌(https://huggingface.co/settings/tokens),**权限为写入(write)**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="创建 HF 令牌">

- 复制该令牌
- 运行下面的代码单元并粘贴令牌

```bash
from huggingface_hub import notebook_login # 登录我们的 Hugging Face 账号,以便能够把模型上传到 Hub。
notebook_login()
!git config --global credential.helper store
```

如果你不想使用 Google Colab 或 Jupyter Notebook,则需要改用这条命令:`huggingface-cli login`

3️⃣ 现在我们已经准备好把训练好的智能体推送到 🤗 Hub 了 🔥

让我们运行 push_to_hub.py 文件,把训练好的智能体上传到 Hub。

`--repo-name `:仓库的名称

`-orga`:你的 Hugging Face 用户名

`-f`:训练好的模型所在的文件夹(在我们的例子中是 `logs`)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit3/select-id.png" alt="选择 Id">

```bash
python -m rl_zoo3.push_to_hub  --algo dqn  --env SpaceInvadersNoFrameskip-v4  --repo-name _____________________ -orga _____________________ -f logs/
```

#### 解答

```bash
python -m rl_zoo3.push_to_hub  --algo dqn  --env SpaceInvadersNoFrameskip-v4  --repo-name dqn-SpaceInvadersNoFrameskip-v4  -orga ThomasSimonini  -f logs/
```

###.

恭喜 🥳 你刚刚使用 RL-Baselines-3 Zoo 训练并上传了你的第一个深度 Q 学习智能体。上面的脚本应该显示了一个指向模型仓库的链接,例如 https://huggingface.co/ThomasSimonini/dqn-SpaceInvadersNoFrameskip-v4。访问这个链接,你可以:

- 在右侧看到**你的智能体的视频预览**。
- 点击 "Files and versions"(文件与版本)查看仓库中的所有文件。
- 点击 "Use in stable-baselines3" 获取一段展示如何加载模型的代码片段。
- 有一个模型卡(`README.md` 文件),介绍了该模型以及你使用的超参数。

在底层,Hub 使用基于 git 的仓库(如果你不了解 git 也不要紧),这意味着你可以在实验和改进智能体的过程中,用新版本更新模型。

使用[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard) 🏆 **与同学们比较你的智能体的成绩**

## 加载一个强大的已训练模型 🔥

- Stable-Baselines3 团队在 Hub 上上传了**150 多个训练好的深度强化学习智能体**。

你可以在这里找到它们:👉 https://huggingface.co/sb3

一些示例:
- Asteroids(小行星):https://huggingface.co/sb3/dqn-AsteroidsNoFrameskip-v4
- Beam Rider:https://huggingface.co/sb3/dqn-BeamRiderNoFrameskip-v4
- Breakout(打砖块):https://huggingface.co/sb3/dqn-BreakoutNoFrameskip-v4
- Road Runner(走鹃):https://huggingface.co/sb3/dqn-RoadRunnerNoFrameskip-v4

让我们加载一个玩 Beam Rider 的智能体:https://huggingface.co/sb3/dqn-BeamRiderNoFrameskip-v4

1. 我们使用 `rl_zoo3.load_from_hub` 下载模型,并把它放到一个新文件夹中,可以命名为 `rl_trained`

```bash
# 下载模型并将其保存到 logs/ 文件夹
python -m rl_zoo3.load_from_hub --algo dqn --env BeamRiderNoFrameskip-v4 -orga sb3 -f rl_trained/
```

2. 让我们评估它 5000 个时间步

```bash
python -m rl_zoo3.enjoy --algo dqn --env BeamRiderNoFrameskip-v4 -n 5000  -f rl_trained/ --no-render
```

为什么不尝试训练你自己的**玩 BeamRiderNoFrameskip-v4 的深度 Q 学习智能体呢?🏆**

如果你想尝试,请查看 https://huggingface.co/sb3/dqn-BeamRiderNoFrameskip-v4#hyperparameters,**在模型卡中,你可以找到训练好的智能体的超参数**。

但寻找超参数可能是一项令人生畏的任务。幸运的是,我们将在下一个单元中看到如何**使用 Optuna 来优化超参数 🔥**。


## 一些额外的挑战 🏆

最好的学习方式**就是自己动手尝试**!

在[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)中你会找到你的智能体。你能登顶吗?

以下是你可以尝试用来训练智能体的环境列表:
- BeamRiderNoFrameskip-v4
- BreakoutNoFrameskip-v4
- EnduroNoFrameskip-v4
- PongNoFrameskip-v4

另外,**如果你想学会自己实现深度 Q 学习**,你绝对应该看看 CleanRL 的实现:https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/dqn_atari.py

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/atari-envs.gif" alt="环境"/>

________________________________________________________________________
恭喜你完成了这一章!

如果你仍然对所有这些内容感到困惑……这完全正常!**对我和所有学过 RL 的人来说都是如此。**

花一些时间真正**掌握这些内容再继续前进,并尝试那些额外的挑战**。掌握这些要点、打下坚实的基础非常重要。

在下一个单元中,**我们将学习 [Optuna](https://optuna.org/)**。深度强化学习中最关键的任务之一,就是找到一组好的训练超参数。Optuna 正是一个能帮你自动完成这一搜索的库。


### 这是一门与你共同打造的课程 👷🏿‍♀️

最后,我们希望根据你的反馈迭代地改进和更新这门课程。如果你有任何反馈,请填写这份表格 👉 https://forms.gle/3HgA7bEHwAmmLfwh9

我们一直在努力改进我们的教程,所以**如果你在这个 notebook 中发现了一些问题**,请[在 Github 仓库上提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

Bonus 第 2 单元见!🔥

### 持续学习,保持精彩 🤗
