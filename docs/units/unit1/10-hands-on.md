> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/hands-on.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/hands-on.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 训练你的第一个深度强化学习智能体 🤖

      > 📓 本单元配套笔记本:[Google Colab](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/notebooks/unit1/unit1.ipynb) · [Discord 求助](http://hf.co/join/discord)

现在你已经学习了强化学习的基础知识,可以准备训练你的第一个智能体,并通过 Hub 与社区分享 🔥:
一个将学会在月球上正确着陆的 Lunar Lander(月球着陆器)智能体 🌕

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/lunarLander.gif" alt="LunarLander">

最后,你将**把这个训练好的智能体上传到 Hugging Face Hub 🤗——一个免费的开放平台,人们可以在上面分享机器学习模型、数据集和演示应用。**

借助我们的<a href="https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard">排行榜</a>,你可以与其他同学比较成绩,交流最佳实践来提升你智能体的分数。谁会赢得第 1 单元的挑战 🏆?

要完成[认证流程](https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process)中本次实操的验证,你需要把训练好的模型推送到 Hub,并且**取得 >= 200 的成绩**。

要查看你的成绩,请前往[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)找到你的模型,**成绩 = mean_reward - std of reward**

**如果找不到你的模型,请到页面底部点击刷新按钮。**

有关认证流程的更多信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

你还可以在这里查看自己的学习进度 👉 https://huggingface.co/spaces/ThomasSimonini/Check-my-progress-Deep-RL-Course

那么我们开始吧!🚀

**要开始实操,请点击 Open In Colab 按钮** 👇:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/unit1/unit1.ipynb)

我们**强烈建议学生使用 Google Colab 来完成实操练习**,而不是在自己的个人电脑上运行。

使用 Google Colab,**你可以专注于学习和实验,而无需操心环境搭建**等技术细节。

# 第 1 单元:训练你的第一个深度强化学习智能体 🤖

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/thumbnail.jpg" alt="Unit 1 thumbnail" width="100%">

在本 notebook 中,你将训练你的**第一个深度强化学习智能体**——一个学会**在月球上正确着陆 🌕** 的 Lunar Lander 智能体。你会使用深度强化学习库 [Stable-Baselines3](https://stable-baselines3.readthedocs.io/en/master/),把训练成果分享给社区,并尝试不同的配置。

### 环境 🎮

- [LunarLander-v2](https://gymnasium.farama.org/environments/box2d/lunar_lander/)

### 使用的库 📚

- [Stable-Baselines3](https://stable-baselines3.readthedocs.io/en/master/)

我们一直在努力改进教程,因此**如果你在本 notebook 中发现了问题**,请[在 GitHub 仓库中提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

## 本 notebook 的目标 🏆

完成本 notebook 后,你将能够:

- 使用环境库 **Gymnasium**;
- 使用深度强化学习库 **Stable-Baselines3**;
- **把你训练好的智能体推送到 Hub**,并附上一段精彩的回放视频和评估分数 🔥。

## 本 notebook 来自深度强化学习课程

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/deep-rl-course-illustration.jpg" alt="Deep RL Course illustration"/>

在这门免费课程中,你将:

- 📖 从**理论和实践**两方面学习深度强化学习;
- 🧑‍💻 学会**使用知名的深度强化学习库**,如 Stable Baselines3、RL Baselines3 Zoo、CleanRL 和 Sample Factory 2.0;
- 🤖 在独特的环境中训练**智能体**;
- 🎓 完成 80% 的作业即可**获得结业证书**。

还有更多内容!

📚 查看课程大纲 👉 https://simoninithomas.github.io/deep-rl-course

别忘了**<a href="http://eepurl.com/ic5ZUD">注册本课程</a>**(我们收集你的邮箱,是为了在各单元发布时**把链接发送给你,并向你提供挑战与更新的相关信息)。**

保持联系、提问的最佳方式是**加入我们的 Discord 服务器**,与社区以及我们交流 👉🏻 https://discord.gg/ydHrjt3WP5

## 前置要求 🏗️

在深入本 notebook 之前,你需要:

🔲 📝 **[阅读第 0 单元](https://huggingface.co/deep-rl-course/unit0/introduction)**,其中包含了关于本课程的全部**信息,能帮助你快速上手** 🤗

🔲 📚 通过[阅读第 1 单元](https://huggingface.co/deep-rl-course/unit1/introduction),**理解强化学习的基础知识**(蒙特卡洛 MC、时序差分 TD、奖励假设等)。

## 深度强化学习小回顾 📚

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/RL_process_game.jpg" alt="强化学习过程" width="100%">

我们来简单回顾一下第 1 单元学到的内容:

- 强化学习是一种**通过动作进行学习的计算方法**。我们构建一个智能体,让它**通过与环境反复试错地交互**来学习,并把奖励(正的或负的)作为反馈。

- 任何强化学习智能体的目标都是**最大化其期望累积奖励**(也称为期望回报),因为强化学习建立在*奖励假设(reward hypothesis)*之上,即所有目标都可以被描述为期望累积奖励的最大化。

- 强化学习过程是一个**循环,输出状态、动作、奖励和下一状态组成的序列**。

- 为了计算期望累积奖励(期望回报),**我们要对奖励进行折扣(discount)**:越早到来的奖励(游戏开始时)越可能发生,因为它们比遥远的未来奖励更可预测。

- 要解决强化学习问题,你需要**找到最优策略(optimal policy)**;策略是你 AI 的"大脑",它告诉我们,在给定状态下应采取什么动作。最优策略就是能给出使期望回报最大化的动作的策略。

寻找最优策略有**两种**方法:

- **直接训练策略**:基于策略的方法(policy-based methods)。
- **训练一个价值函数**,它告诉我们智能体在每个状态能获得的期望回报,再用这个函数来定义策略:基于价值的方法(value-based methods)。

- 最后,我们之所以谈论深度强化学习,是因为**我们引入深度神经网络来估计应采取的动作(基于策略)或估计某个状态的价值(基于价值),这就是"深度"一词的由来**。

# 来训练我们的第一个深度强化学习智能体并上传到 Hub 🚀

## 获得证书 🎓

要完成[认证流程](https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process)中本次实操的验证,你需要把训练好的模型推送到 Hub,并且**取得 >= 200 的成绩**。

要查看你的成绩,请前往[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)找到你的模型,**成绩 = mean_reward - std of reward**

有关认证流程的更多信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

## 设置 GPU 💪

- 为了**加速智能体的训练,我们将使用 GPU**。为此,请前往 `Runtime > Change Runtime type`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step1.jpg" alt="GPU 步骤 1">

- `Hardware Accelerator > GPU`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step2.jpg" alt="GPU 步骤 2">

## 安装依赖并创建虚拟屏幕 🔽

第一步是安装依赖,我们要安装好几个。

- `gymnasium[box2d]`:包含 LunarLander-v2 环境 🌛
- `stable-baselines3[extra]`:深度强化学习库。
- `huggingface_sb3`:为 Stable-baselines3 提供的附加代码,用于从 Hugging Face 🤗 Hub 加载和上传模型。

为了让事情更简单,我们写了一个脚本来安装所有这些依赖。

```bash
apt install swig cmake
```

```bash
pip install -r https://raw.githubusercontent.com/huggingface/deep-rl-class/main/notebooks/unit1/requirements-unit1.txt
```

在本 notebook 中,我们需要生成一段回放视频。为此,在 Colab 上**我们需要一个虚拟屏幕才能渲染环境**(从而录制每一帧画面)。

因此,下面的单元格会安装虚拟屏幕相关的库,并创建、启动一个虚拟屏幕 🖥

```bash
sudo apt-get update
apt install python3-opengl
apt install ffmpeg
apt install xvfb
pip3 install pyvirtualdisplay
```

为确保使用的是新安装的库,**有时需要重启 notebook 的运行时**。下一个单元格会让**运行时强制崩溃,所以你需要重新连接,并从这里开始重新运行代码**。多亏这个小技巧,**我们才能顺利运行虚拟屏幕**。

```python
import os

os.kill(os.getpid(), 9)
```

```python
# 虚拟屏幕
from pyvirtualdisplay import Display

virtual_display = Display(visible=0, size=(1400, 900))
virtual_display.start()
```

## 导入所需的包 📦

我们额外导入的一个库是 huggingface_hub,**以便从 Hub 上传和下载训练好的模型**。

Hugging Face Hub 🤗 是一个中心化的平台,任何人都可以在上面分享和浏览模型与数据集。它具备版本管理、指标、可视化等特性,方便你与他人轻松协作。

你可以在这里查看所有可用的深度强化学习模型 👉 https://huggingface.co/models?pipeline_tag=reinforcement-learning&sort=downloads

```python
import gymnasium

from huggingface_sb3 import load_from_hub, package_to_hub
from huggingface_hub import (
    notebook_login,
)  # 登录我们的 Hugging Face 账号,以便将模型上传到 Hub。

from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.monitor import Monitor
```

## 理解 Gymnasium 及其工作方式 🤖

🏋 包含我们所需环境的库叫作 Gymnasium。
**在深度强化学习中,你会大量使用 Gymnasium。**

Gymnasium 是 Gym 库的**新版本**,由 Farama 基金会[维护](https://farama.org/)。

Gymnasium 库提供两样东西:

- 一个让你能够**创建强化学习环境**的接口。
- 一个**环境集合**(gym-control、atari、box2D 等)。

我们来看一个例子,但首先回顾一下强化学习循环。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/RL_process_game.jpg" alt="强化学习过程" width="100%">

在每一步中:
- 我们的智能体从**环境**那里接收一个**状态(S0)**——也就是收到游戏(环境)的第一帧画面。
- 基于该**状态(S0)**,智能体采取一个**动作(A0)**——我们的智能体会向右移动。
- 环境转移到**新**的**状态(S1)**——新的一帧画面。
- 环境给智能体一定的**奖励(R1)**——我们没有死掉*(正奖励 +1)*。

在 Gymnasium 中:

1️⃣ 使用 `gymnasium.make()` 创建环境

2️⃣ 用 `observation = env.reset()` 把环境重置到初始状态

在每一步中:

3️⃣ 用我们的模型得到一个动作(在本例中我们随机选取动作)

4️⃣ 使用 `env.step(action)`,我们在环境中执行这个动作,并获得:
- `observation`:新状态(st+1)
- `reward`:执行该动作后获得的奖励
- `terminated`:指示回合(episode)是否结束(智能体到达终止状态)
- `truncated`:这是新版本引入的,表示超过时间限制,或例如智能体越出环境边界等情况
- `info`:一个提供附加信息的字典(取决于具体环境)

更多说明请看这里 👉 https://gymnasium.farama.org/api/env/#gymnasium.Env.step

如果回合结束了:
- 我们用 `observation = env.reset()` 把环境重置到初始状态

**来看一个例子吧!**请务必仔细阅读代码

```python
import gymnasium as gym

# 首先,我们创建名为 LunarLander-v2 的环境
env = gym.make("LunarLander-v2")

# 然后重置这个环境
observation, info = env.reset()

for _ in range(20):
    # 随机选择一个动作
    action = env.action_space.sample()
    print("Action taken:", action)

    # 在环境中执行该动作,并获得
    # next_state、reward、terminated、truncated 和 info
    observation, reward, terminated, truncated, info = env.step(action)

    # 如果游戏终止(在本例中是着陆或坠毁)或被截断(超时)
    if terminated or truncated:
        # 重置环境
        print("Environment is reset")
        observation, info = env.reset()

env.close()
```

## 创建 LunarLander 环境 🌛 并理解其工作原理

### 环境 🎮

在第一个教程中,我们要训练我们的智能体——一个 [Lunar Lander](https://gymnasium.farama.org/environments/box2d/lunar_lander/)——**在月球上正确着陆**。为此,智能体需要学会**调整自己的速度和位置(水平、垂直和角度),以便正确着陆。**

---

💡 开始使用一个环境时,一个好习惯是先查看它的文档

👉 https://gymnasium.farama.org/environments/box2d/lunar_lander/

---

我们来看看这个环境长什么样:

```python
# 我们使用 gym.make("<环境名称>") 来创建环境
env = gym.make("LunarLander-v2")
env.reset()
print("_____OBSERVATION SPACE_____ \n")
print("Observation Space Shape", env.observation_space.shape)
print("Sample observation", env.observation_space.sample())  # 获取一个随机观测
```

从 `Observation Space Shape (8,)` 可以看出,观测是一个大小为 8 的向量,其中每个值包含着陆器的不同信息:
- 着陆坪的水平坐标
- 着陆坪的垂直坐标
- 水平速度
- 垂直速度
- 角度
- 角速度
- 左腿接触点是否接触地面(布尔值)
- 右腿接触点是否接触地面(布尔值)

```python
print("\n _____ACTION SPACE_____ \n")
print("Action Space Shape", env.action_space.n)
print("Action Space Sample", env.action_space.sample())  # 随机选择一个动作
```

动作空间(智能体可以采取的一组可能动作)是离散的,共有 4 种可用动作 🎮:

- 动作 0:什么都不做,
- 动作 1:点燃左侧姿态发动机,
- 动作 2:点燃主发动机,
- 动作 3:点燃右侧姿态发动机。

奖励函数(在每个时间步给出奖励的函数)💰:

每一步之后都会获得一个奖励。一个回合的总奖励是**该回合内所有步骤奖励之和**。

在每一步中,奖励:

- 随着陆器离着陆坪越近而增加/越远而减少。
- 随着陆器移动越慢而增加/越快而减少。
- 着陆器倾斜越多(角度偏离水平)则越少。
- 每条腿接触地面就增加 10 分。
- 侧向发动机点火的每一帧减少 0.03 分。
- 主发动机点火的每一帧减少 0.3 分。

如果坠毁或安全着陆,该回合还会分别获得 **-100 或 +100 分的额外奖励。**

一个回合**得分不低于 200 分,就视为成功解决。**

#### 向量化环境(Vectorized Environment)

- 我们创建一个包含 16 个环境的向量化环境(把多个独立环境堆叠成一个环境的方法),这样,**训练过程中我们会获得更加多样的经验。**

```python
# 创建环境
env = make_vec_env("LunarLander-v2", n_envs=16)
```

## 创建模型 🤖

- 我们已经研究了环境并理解了问题:**通过控制左侧、右侧姿态发动机和主发动机,让 Lunar Lander 正确降落到着陆坪上**。现在,让我们构建用来解决这个问题的算法 🚀。

- 为此,我们将使用第一个深度强化学习库:[Stable Baselines3(SB3)](https://stable-baselines3.readthedocs.io/en/master/)。

- SB3 是一套**基于 PyTorch 的可靠强化学习算法实现**。

---

💡 使用新库时的一个好习惯是先钻研文档:https://stable-baselines3.readthedocs.io/en/master/,然后再尝试一些教程。

----

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/sb3.png" alt="Stable Baselines3">

为了解决这个问题,我们将使用 SB3 的 **PPO**。[PPO(全称 Proximal Policy Optimization,近端策略优化)是最先进的深度强化学习算法之一,你在本课程中将会学到它](https://stable-baselines3.readthedocs.io/en/master/modules/ppo.html#example%5D)。

PPO 是以下两者的结合:
- *基于价值的强化学习方法*:学习一个动作价值函数(action-value function),它会告诉我们**给定状态和动作时,应采取的最有价值的动作**。
- *基于策略的强化学习方法*:学习一个策略,**给出动作上的概率分布**。

Stable-Baselines3 的上手非常简单:

1️⃣ 你**创建环境**(上面已经完成)

2️⃣ 你定义**要使用的模型并实例化它** `model = PPO("MlpPolicy")`

3️⃣ 你用 `model.learn` **训练智能体**,并指定训练时间步的数量

```
# 创建环境
env = gym.make('LunarLander-v2')

# 实例化智能体
model = PPO('MlpPolicy', env, verbose=1)
# 训练智能体
model.learn(total_timesteps=int(2e5))
```

```python
# TODO:定义一个 PPO MlpPolicy 结构
# 我们使用多层感知机(MLPPolicy),因为输入是一个向量;
# 如果输入是图像帧,我们就要使用 CnnPolicy
model =
```

#### 参考答案

```python
# 参考答案
# 我们添加了一些参数来加速训练
model = PPO(
    policy="MlpPolicy",
    env=env,
    n_steps=1024,
    batch_size=64,
    n_epochs=4,
    gamma=0.999,
    gae_lambda=0.98,
    ent_coef=0.01,
    verbose=1,
)
```

## 训练 PPO 智能体 🏃

- 我们来训练智能体 1,000,000 个时间步,别忘了在 Colab 上使用 GPU。这大约需要 20 分钟,不过如果你只是想试一试,可以用更少的时间步。
- 训练期间,去喝杯 ☕ 休息一下吧,这是你应得的 🤗

```python
# TODO:训练 1,000,000 个时间步

# TODO:为模型指定文件名,并将模型保存到文件
model_name = "ppo-LunarLander-v2"
```

#### 参考答案

```python
# 参考答案
# 训练 1,000,000 个时间步
model.learn(total_timesteps=1000000)
# 保存模型
model_name = "ppo-LunarLander-v2"
model.save(model_name)
```

## 评估智能体 📈

- 记得用 [Monitor](https://stable-baselines3.readthedocs.io/en/master/common/monitor.html) 包裹环境。
- 现在我们的 Lunar Lander 智能体已经训练完毕 🚀,接下来需要**检验它的性能**。
- Stable-Baselines3 提供了一个方法:`evaluate_policy`。
- 要完成这部分内容,你需要[查阅文档](https://stable-baselines3.readthedocs.io/en/master/guide/examples.html#basic-usage-training-saving-loading)
- 下一步我们会看到**如何自动评估并分享你的智能体、参加排行榜比拼,但现在先让我们亲自动手**

💡 评估智能体时,不应使用训练环境,而应创建一个评估环境。

```python
# TODO:评估智能体
# 创建一个用于评估的新环境
eval_env =

# 用 10 个评估回合、deterministic=True 来评估模型
mean_reward, std_reward =

# 打印结果
```

#### 参考答案

```python
# @title
eval_env = Monitor(gym.make("LunarLander-v2"))
mean_reward, std_reward = evaluate_policy(model, eval_env, n_eval_episodes=10, deterministic=True)
print(f"mean_reward={mean_reward:.2f} +/- {std_reward}")
```

- 就我而言,训练 100 万步后,我得到的平均奖励为 `200.20 +/- 20.80`,这意味着我们的月球着陆器智能体已经可以登陆月球了 🌛🥳。

## 把训练好的模型发布到 Hub 🔥

看到训练取得了不错的结果之后,我们只需一行代码,就能把训练好的模型发布到 Hub 🤗。

📚 相关库的文档 👉 https://github.com/huggingface/huggingface_sb3/tree/main#hugging-face--x-stable-baselines3-v20

下面是一个模型卡(Model Card)的示例(以 Space Invaders 为例):

使用 `package_to_hub`,**你可以评估模型、录制回放、为你的智能体生成模型卡,并把它推送到 Hub**。

这样一来:
- 你可以**展示自己的成果** 🔥
- 你可以**观看智能体游玩的画面** 👀
- 你可以**与社区分享一个他人也能使用的智能体** 💾
- 你可以**访问排行榜 🏆,看看你的智能体和同学相比表现如何** 👉 https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard

要把你的模型分享给社区,还需要完成以下三个步骤:

1️⃣(如果还没有的话)在 Hugging Face 上创建账号 ➡ https://huggingface.co/join

2️⃣ 登录之后,你需要保存来自 Hugging Face 网站的认证令牌。
- 创建一个新令牌(https://huggingface.co/settings/tokens),**权限选择 write(写入)**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="创建 HF 令牌">

- 复制该令牌
- 运行下面的单元格,并粘贴令牌

```python
notebook_login()
!git config --global credential.helper store
```

如果你不想使用 Google Colab 或 Jupyter Notebook,则需要改用这条命令:`huggingface-cli login`

3️⃣ 现在我们可以使用 `package_to_hub()` 函数,把训练好的智能体推送到 🤗 Hub 了 🔥

我们来填写 `package_to_hub` 函数的各个参数:
- `model`:我们训练好的模型。
- `model_name`:训练好的模型的名称,即我们在 `model_save` 中定义的名字
- `model_architecture`:我们使用的模型架构,本例中是 PPO
- `env_id`:环境的名称,本例中是 `LunarLander-v2`
- `eval_env`:评估环境,即之前定义的 eval_env
- `repo_id`:将要创建/更新的 Hugging Face Hub 仓库的名称 `(repo_id = {username}/{repo_name})`

💡 **推荐命名为 `{username}/{model_architecture}-{env_id}`**

- `commit_message`:提交(commit)信息

```python
import gymnasium as gym
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.env_util import make_vec_env

from huggingface_sb3 import package_to_hub

## TODO:定义 repo_id
## repo_id 是 Hugging Face Hub 上模型仓库的 id(repo_id = {organization}/{repo_name},例如 ThomasSimonini/ppo-LunarLander-v2)
repo_id =

# TODO:定义环境名称
env_id =

# 创建评估环境,并设置 render_mode="rgb_array"
eval_env = DummyVecEnv([lambda: gym.make(env_id, render_mode="rgb_array")])


# TODO:定义我们使用的模型架构
model_architecture = ""

## TODO:定义提交信息
commit_message = ""

# 该方法会先保存、评估模型,生成模型卡并录制智能体的回放视频,然后把仓库推送到 Hub
package_to_hub(model=model, # 我们训练好的模型
               model_name=model_name, # 我们训练好的模型的名称
               model_architecture=model_architecture, # 我们使用的模型架构:本例中为 PPO
               env_id=env_id, # 环境名称
               eval_env=eval_env, # 评估环境
               repo_id=repo_id, # Hugging Face Hub 上模型仓库的 id(repo_id = {organization}/{repo_name},例如 ThomasSimonini/ppo-LunarLander-v2
               commit_message=commit_message)
```

#### 参考答案

```python
import gymnasium as gym

from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.env_util import make_vec_env

from huggingface_sb3 import package_to_hub

# 把你刚在上上个单元格中定义的变量放到这里
# 定义环境名称
env_id = "LunarLander-v2"

# TODO:定义我们使用的模型架构
model_architecture = "PPO"

## 定义 repo_id
## repo_id 是 Hugging Face Hub 上模型仓库的 id(repo_id = {organization}/{repo_name},例如 ThomasSimonini/ppo-LunarLander-v2
## 换成你自己的 repo id
repo_id = "ThomasSimonini/ppo-LunarLander-v2"  # 换成你自己的 repo id,不能推送到我的哦 😄

## 定义提交信息
commit_message = "Upload PPO LunarLander-v2 trained agent"

# 创建评估环境,并设置 render_mode="rgb_array"
eval_env = DummyVecEnv([lambda: Monitor(gym.make(env_id, render_mode="rgb_array"))])

# 把你刚填写好的 package_to_hub 函数放到这里
package_to_hub(
    model=model,  # 我们训练好的模型
    model_name=model_name,  # 我们训练好的模型的名称
    model_architecture=model_architecture,  # 我们使用的模型架构:本例中为 PPO
    env_id=env_id,  # 环境名称
    eval_env=eval_env,  # 评估环境
    repo_id=repo_id,  # Hugging Face Hub 上模型仓库的 id(repo_id = {organization}/{repo_name},例如 ThomasSimonini/ppo-LunarLander-v2
    commit_message=commit_message,
)
```

恭喜 🥳 你刚刚训练并上传了你的第一个深度强化学习智能体。上面的脚本应该已经显示了一个指向模型仓库的链接,例如 https://huggingface.co/osanseviero/test_sb3。打开这个链接,你可以:
* 在右侧看到智能体游玩的视频预览。
* 点击 "Files and versions" 查看仓库中的所有文件。
* 点击 "Use in stable-baselines3" 获取展示如何加载模型的代码片段。
* 查看模型卡(`README.md` 文件),其中包含对该模型的描述。

在底层,Hub 使用基于 git 的仓库(如果你不了解 git 也不必担心),这意味着在你不断实验、改进智能体的过程中,可以用新版本更新模型。

使用排行榜 🏆 与同学们比较你的 LunarLander-v2 结果 👉 https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard

## 从 Hub 加载已保存的 LunarLander 模型 🤗
感谢 [ironbar](https://github.com/ironbar) 的贡献。

从 Hub 加载已保存的模型非常简单。

前往 https://huggingface.co/models?library=stable-baselines3 查看所有已保存的 Stable-baselines3 模型列表。
1. 选择其中一个,并复制它的 repo_id

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit1/copy-id.png" alt="复制 id"/>

2. 然后我们只需要使用 load_from_hub,并提供:
- repo_id
- 文件名:仓库中已保存的模型文件及其扩展名(*.zip)

由于我从 Hub 下载的模型是用 Gym(Gymnasium 的前身)训练的,我们需要安装 shimmy——一个 API 转换工具,它能帮助我们正确运行该环境。

Shimmy 文档:https://github.com/Farama-Foundation/Shimmy

```python
!pip install shimmy
```

```python
from huggingface_sb3 import load_from_hub

repo_id = "Classroom-workshop/assignment2-omar"  # repo_id
filename = "ppo-LunarLander-v2.zip"  # 模型文件名.zip

# 当模型在 Python 3.8 上训练时,pickle 协议是 5
# 而 Python 3.6、3.7 使用协议 4
# 为了获得兼容性,我们需要:
# 1. 安装 pickle5(我们在 Colab 开头已经完成)
# 2. 创建一个自定义的空对象,作为参数传给 PPO.load()
custom_objects = {
    "learning_rate": 0.0,
    "lr_schedule": lambda _: 0.0,
    "clip_range": lambda _: 0.0,
}

checkpoint = load_from_hub(repo_id, filename)
model = PPO.load(checkpoint, custom_objects=custom_objects, print_system_info=True)
```

我们来评估这个智能体:

```python
# @title
eval_env = Monitor(gym.make("LunarLander-v2"))
mean_reward, std_reward = evaluate_policy(model, eval_env, n_eval_episodes=10, deterministic=True)
print(f"mean_reward={mean_reward:.2f} +/- {std_reward}")
```

## 一些额外的挑战 🏆
学习的最好方式**就是自己动手尝试**!正如你所看到的,当前的智能体表现还不算好。第一个建议是训练更多步数。在 1,000,000 步时,我们就看到了不错的效果!

在[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)上你会看到你的智能体。你能冲到榜首吗?

以下是一些实现思路:
* 训练更多步数
* 为 `PPO` 尝试不同的超参数,可以在 https://stable-baselines3.readthedocs.io/en/master/modules/ppo.html#parameters 查看。
* 查看 [Stable-Baselines3 文档](https://stable-baselines3.readthedocs.io/en/master/modules/dqn.html),尝试其他模型,例如 DQN。
- **把你新训练的模型推送到 Hub** 🔥

使用[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard) 🏆 **与同学们比较你的 LunarLander-v2 结果**

登月对你来说太无聊了?试试**换个环境**吧,比如 MountainCar-v0、CartPole-v1 或 CarRacing-v0?通过 [gym 文档](https://www.gymlibrary.dev/)了解它们的工作方式,尽情享受乐趣 🎉。

________________________________________________________________________
恭喜你完成了这一章!这是最长的一章,**信息量非常大。**

如果你仍然对这些内容感到困惑……这完全正常!**我和所有学过强化学习的人都经历过同样的阶段。**

在继续之前,请花时间真正**吃透这些内容,并尝试那些额外的挑战**。掌握这些内容、打下扎实的基础非常重要。

当然,在后续课程中我们会更深入地探讨这些概念,但**在进入下一章之前,最好现在就对它们有充分的理解。**

下次,在附加单元 1 中,你将训练小狗 Huggy 去捡回木棍。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit1/huggy.jpg" alt="Huggy"/>

## 持续学习,保持优秀 🤗
