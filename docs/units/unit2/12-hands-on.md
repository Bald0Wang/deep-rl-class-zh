> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/hands-on.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/hands-on.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 动手实践

      > 📓 本单元配套笔记本:[Google Colab](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/notebooks/unit2/unit2.ipynb) · [Discord 求助](http://hf.co/join/discord)



既然我们已经学习了 Q-Learning 算法,现在让我们从零开始实现它,并在两个环境中训练我们的 Q-Learning 智能体:
1. [Frozen-Lake-v1(冰湖,含不打滑版和打滑版)](https://gymnasium.farama.org/environments/toy_text/frozen_lake/) ☃️:智能体需要**从起始状态(S)走到目标状态(G)**,只能走在冰面格子(F)上,并避开冰洞(H)。
2. [一辆自动驾驶出租车(Taxi)](https://gymnasium.farama.org/environments/toy_text/taxi/) 🚖 需要**学会在城市中导航**,把乘客**从 A 点送到 B 点**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/envs.gif" alt="Environments"/>

借助[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard),你可以把自己的结果与其他同学比较,并交流最佳实践来提升智能体的得分。第二单元的挑战谁会胜出呢?

要通过[认证流程](https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process)验证本次动手实践,你需要把训练好的 Taxi 模型推送到 Hub,并且**拿到 >= 4.5 的结果**。

要查看你的结果,请前往[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)找到你的模型,**结果 = mean_reward - std of reward**

想了解更多关于认证流程的信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

你可以在这里查看自己的学习进度 👉 https://huggingface.co/spaces/ThomasSimonini/Check-my-progress-Deep-RL-Course


**要开始动手实践,请点击 Open In Colab 按钮** 👇:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/unit2/unit2.ipynb)


我们强烈**建议同学们使用 Google Colab 来完成动手练习**,而不是在自己的个人电脑上运行。

使用 Google Colab,**你可以专注于学习和实验,而不必为环境搭建等技术问题操心**。


# 第 2 单元:用 Q-Learning 玩 FrozenLake-v1 ⛄ 和 Taxi-v3 🚕

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/thumbnail.jpg" alt="Unit 2 Thumbnail">

在这个 notebook 中,**你将从零开始编写你的第一个强化学习智能体**,用 Q-Learning 玩 FrozenLake(冰湖)❄️,把它分享给社区,并尝试不同的配置。

⬇️ 下面展示了**你只需几分钟就能实现的效果** ⬇️


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/envs.gif" alt="Environments"/>

### 🎮 环境:

- [FrozenLake-v1](https://gymnasium.farama.org/environments/toy_text/frozen_lake/)
- [Taxi-v3](https://gymnasium.farama.org/environments/toy_text/taxi/)

### 📚 强化学习库:

- Python 和 NumPy
- [Gymnasium](https://gymnasium.farama.org/)

我们一直在努力改进教程,所以**如果你在这个 notebook 中发现了问题**,请在 [GitHub 仓库上提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

## 本 notebook 的目标 🏆

完成本 notebook 后,你将:

- 会使用环境库 **Gymnasium**。
- 会从零开始编写一个 Q-Learning 智能体。
- 能够**把训练好的智能体和代码推送到 Hub**,并附上漂亮的回放视频和评估得分 🔥。

## 本 notebook 来自深度强化学习课程

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/deep-rl-course-illustration.jpg" alt="Deep RL Course illustration"/>

在这门免费课程中,你将:

- 📖 从**理论与实践**两方面学习深度强化学习。
- 🧑‍💻 学会**使用知名的深度强化学习库**,如 Stable Baselines3、RL Baselines3 Zoo、CleanRL 和 Sample Factory 2.0。
- 🤖 在**独一无二的环境中训练智能体**

更多内容,请查看 📚 课程大纲 👉 https://simoninithomas.github.io/deep-rl-course

别忘了 **<a href="http://eepurl.com/ic5ZUD">注册课程</a>**(我们收集你的邮箱,是为了**在每个单元发布时把链接发给你,并向你提供挑战和更新的信息**)


与我们保持联系的最佳方式是加入我们的 Discord 服务器,与社区和我们交流 👉🏻 https://discord.gg/ydHrjt3WP5

## 前置要求 🏗️

在进入 notebook 之前,你需要:

🔲 📚 **[阅读第 2 单元,学习 Q-Learning](https://huggingface.co/deep-rl-course/unit2/introduction)** 🤗

## Q-Learning 快速回顾

*Q-Learning* **是这样一种强化学习算法**:

- 训练 *Q 函数*,即一种**动作价值函数**,它在内部存储中由一张 *Q 表*编码,**这张 Q 表包含所有状态-动作对的价值**。

- 给定一个状态和一个动作,我们的 Q 函数**会在 Q 表中查找对应的价值**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-function-2.jpg" alt="Q function"  width="100%"/>

- 当训练完成后,**我们就拥有了一个最优 Q 函数,也就是一张最优 Q 表**。

- 而如果我们**拥有最优 Q 函数**,我们就拥有了最优策略,因为我们**知道每个状态下应该采取的最佳动作**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/link-value-policy.jpg" alt="Link value policy"  width="100%"/>


但一开始,**我们的 Q 表毫无用处,因为它为每个状态-动作对给出的是任意值(大多数时候我们把 Q 表初始化为 0)**。不过,随着我们探索环境并不断更新 Q 表,它会给出越来越好的近似

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit2/q-learning.jpeg" alt="q-learning.jpeg" width="100%"/>

下面就是 Q-Learning 的伪代码:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-2.jpg" alt="Q-Learning" width="100%"/>


# 动手编写我们的第一个强化学习算法 🚀

要通过[认证流程](https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process)验证本次动手实践,你需要把训练好的 Taxi 模型推送到 Hub,并且**拿到 >= 4.5 的结果**。

要查看你的结果,请前往[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)找到你的模型,**结果 = mean_reward - std of reward**

想了解更多关于认证流程的信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

## 安装依赖并创建虚拟显示器 🔽

在这个 notebook 中,我们需要生成一段回放视频。为此,在 Colab 上,**我们需要有一个虚拟屏幕来渲染环境**(从而记录帧画面)。

因此,下面的单元格会安装所需的库,并创建和启动一个虚拟屏幕 🖥

我们将安装以下几个库:

- `gymnasium`:包含 FrozenLake-v1 ⛄ 和 Taxi-v3 🚕 环境。
- `pygame`:用于 FrozenLake-v1 和 Taxi-v3 的界面。
- `numpy`:用于处理我们的 Q 表。

Hugging Face Hub 🤗 是一个中心平台,任何人都可以在上面分享和浏览模型与数据集。它提供版本管理、指标、可视化等功能,让你可以轻松与他人协作。

你可以在这里查看所有可用的深度强化学习模型(使用 Q Learning 的模型)👉 https://huggingface.co/models?other=q-learning

```bash
pip install -r https://raw.githubusercontent.com/huggingface/deep-rl-class/main/notebooks/unit2/requirements-unit2.txt
```

```bash
sudo apt-get update
sudo apt-get install -y python3-opengl
apt install ffmpeg xvfb
pip3 install pyvirtualdisplay
```

为了确保使用的是新安装的库,**有时需要重启 notebook 的运行时(runtime)**。下一个单元格会强制**让运行时崩溃,这样你需要重新连接,并从这里开始重新运行代码**。借助这个小技巧,**我们就能启动虚拟屏幕了。**

```python
import os

os.kill(os.getpid(), 9)
```

```python
# 虚拟显示器
from pyvirtualdisplay import Display

virtual_display = Display(visible=0, size=(1400, 900))
virtual_display.start()
```

## 导入所需的包 📦

除了已安装的库,我们还用到:

- `random`:用于生成随机数(在 epsilon-贪婪策略中会派上用场)。
- `imageio`:用于生成回放视频。

```python
import numpy as np
import gymnasium as gym
import random
import imageio
import os
import tqdm

import pickle5 as pickle
from tqdm.notebook import tqdm
```

现在我们可以开始编写 Q-Learning 算法了 🔥

# 第 1 部分:Frozen Lake(冰湖)⛄(不打滑版)

## 创建并了解 [FrozenLake 环境 ⛄]((https://gymnasium.farama.org/environments/toy_text/frozen_lake/)
---

💡 开始使用一个环境时,一个好习惯是先查看它的文档

👉 https://gymnasium.farama.org/environments/toy_text/frozen_lake/

---

我们要训练 Q-Learning 智能体**从起始状态(S)导航到目标状态(G),只能走在冰面格子(F)上,并避开冰洞(H)**。

环境有两种尺寸可选:

- `map_name="4x4"`:4x4 网格版本
- `map_name="8x8"`:8x8 网格版本


环境有两种模式:

- `is_slippery=False`:由于冰湖不打滑,智能体总是**朝预期的方向**移动(确定性)。
- `is_slippery=True`:由于冰湖打滑,智能体**不一定总是朝预期的方向**移动(随机性)。

目前我们先用简单的方式:4x4 地图、不打滑。
我们添加一个名为 `render_mode` 的参数,用于指定环境的可视化方式。在我们的场景中,因为**最后要录制一段环境的视频,所以需要把 render_mode 设置为 rgb_array**。

正如[文档](https://gymnasium.farama.org/api/env/#gymnasium.Env.render)所解释的,"rgb_array":返回一个代表环境当前状态的单帧。帧是一个形状为 (x, y, 3) 的 np.ndarray,表示一幅 x 乘 y 像素图像的 RGB 值。

```python
# 使用 4x4 地图、不打滑版本创建 FrozenLake-v1 环境,并设置 render_mode="rgb_array"
env = gym.make()  # TODO 使用正确的参数
```

### 解答

```python
env = gym.make("FrozenLake-v1", map_name="4x4", is_slippery=False, render_mode="rgb_array")
```

你也可以像这样创建自定义网格:

```python
desc=["SFFF", "FHFH", "FFFH", "HFFG"]
gym.make('FrozenLake-v1', desc=desc, is_slippery=True)
```

但目前我们还是使用默认环境。

### 我们来看看这个环境长什么样:


```python
# 我们用 gym.make("<环境名>") 创建环境——`is_slippery=False`:由于冰湖不打滑,智能体总是朝预期方向移动(确定性)。
print("_____OBSERVATION SPACE_____ \n")
print("Observation Space", env.observation_space)
print("Sample observation", env.observation_space.sample())  # 获取一个随机观测
```

从 `Observation Space Shape Discrete(16)` 可以看出,观测是一个整数,表示**智能体当前的位置,计算方式为 current_row * ncols + current_col(行和列都从 0 开始)**。

例如,4x4 地图中目标位置可以这样计算:3 * 4 + 3 = 15。可能的观测数量取决于地图的大小。**例如,4x4 地图有 16 种可能的观测。**


例如,状态 = 0 是这个样子:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit2/frozenlake.png" alt="FrozenLake">

```python
print("\n _____ACTION SPACE_____ \n")
print("Action Space Shape", env.action_space.n)
print("Action Space Sample", env.action_space.sample())  # 采取一个随机动作
```

动作空间(智能体可以采取的所有可能动作的集合)是离散的,共有 4 个可用动作 🎮:
- 0:向左
- 1:向下
- 2:向右
- 3:向上

奖励函数 💰:
- 到达目标:+1
- 掉入冰洞:0
- 走到冰面:0

## 创建并初始化 Q 表 🗄️

(👀 伪代码的第 1 步)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-2.jpg" alt="Q-Learning" width="100%"/>


是时候初始化我们的 Q 表了!要知道需要多少行(状态)和多少列(动作),我们需要知道动作空间和观测空间的大小。前面我们已经知道了它们的值,但我们还是希望通过代码来获取,这样我们的算法就能泛化到不同的环境。Gym 为我们提供了方法:`env.action_space.n` 和 `env.observation_space.n`


```python
state_space =
print("There are ", state_space, " possible states")

action_space =
print("There are ", action_space, " possible actions")
```

```python
# 我们用 np.zeros 创建尺寸为 (state_space, action_space) 的 Q 表,并把每个值初始化为 0。np.zeros 需要一个元组 (a,b)
def initialize_q_table(state_space, action_space):
  Qtable =
  return Qtable
```

```python
Qtable_frozenlake = initialize_q_table(state_space, action_space)
```

### 解答

```python
state_space = env.observation_space.n
print("There are ", state_space, " possible states")

action_space = env.action_space.n
print("There are ", action_space, " possible actions")
```

```python
# 我们用 np.zeros 创建尺寸为 (state_space, action_space) 的 Q 表,并把每个值初始化为 0
def initialize_q_table(state_space, action_space):
    Qtable = np.zeros((state_space, action_space))
    return Qtable
```

```python
Qtable_frozenlake = initialize_q_table(state_space, action_space)
```

## 定义贪婪策略 🤖

记住,我们有两个策略,因为 Q-Learning 是一种**离策略(off-policy)**算法。这意味着我们**在执行动作和更新价值函数时使用不同的策略**。

- epsilon-贪婪策略(行动策略)
- 贪婪策略(更新策略)

当 Q-Learning 智能体完成训练后,贪婪策略也将成为我们最终拥有的策略。贪婪策略用于根据 Q 表来选择动作。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/off-on-4.jpg" alt="Q-Learning" width="100%"/>


```python
def greedy_policy(Qtable, state):
  # 利用:采取状态-动作价值最高的动作
  action =

  return action
```

#### 解答

```python
def greedy_policy(Qtable, state):
    # 利用:采取状态-动作价值最高的动作
    action = np.argmax(Qtable[state][:])

    return action
```

## 定义 epsilon-贪婪策略 🤖

epsilon-贪婪策略是处理探索与利用权衡的训练策略。

epsilon-贪婪策略的思路:

- 以 *1 - ɛ 的概率*:我们进行**利用**(即智能体选择状态-动作对价值最高的动作)。

- 以 *ɛ 的概率*:我们进行**探索**(尝试一个随机动作)。

随着训练继续,我们逐步**减小 epsilon 的值,因为探索的需求越来越少,而利用的需求越来越多**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-4.jpg" alt="Q-Learning" width="100%"/>


```python
def epsilon_greedy_policy(Qtable, state, epsilon):
  # 在 0 到 1 之间随机生成一个数
  random_num =
  # 如果 random_num 大于 epsilon --> 利用
  if random_num > epsilon:
    # 给定状态,选择价值最高的动作
    # np.argmax 在这里会很有用
    action =
  # 否则 --> 探索
  else:
    action = # 采取一个随机动作

  return action
```

#### 解答

```python
def epsilon_greedy_policy(Qtable, state, epsilon):
    # 在 0 到 1 之间随机生成一个数
    random_num = random.uniform(0, 1)
    # 如果 random_num 大于 epsilon --> 利用
    if random_num > epsilon:
        # 给定状态,选择价值最高的动作
        # np.argmax 在这里会很有用
        action = greedy_policy(Qtable, state)
    # 否则 --> 探索
    else:
        action = env.action_space.sample()

    return action
```

## 定义超参数 ⚙️

与探索相关的超参数是最重要的一批超参数。

- 我们要确保智能体**对状态空间探索得足够充分**,才能学到较好的价值近似。为此,需要让 epsilon 逐步衰减。
- 如果 epsilon 衰减得太快(decay_rate 过高),**你的智能体就有陷入僵局的风险**,因为它对状态空间探索不足,从而无法解决问题。

```python
# 训练参数
n_training_episodes = 10000  # 总训练回合数
learning_rate = 0.7  # 学习率

# 评估参数
n_eval_episodes = 100  # 测试回合总数

# 环境参数
env_id = "FrozenLake-v1"  # 环境名称
max_steps = 99  # 每个回合的最大步数
gamma = 0.95  # 折扣率
eval_seed = []  # 环境的评估种子

# 探索参数
max_epsilon = 1.0  # 初始探索概率
min_epsilon = 0.05  # 最小探索概率
decay_rate = 0.0005  # 探索概率的指数衰减率
```

## 创建训练循环方法

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-2.jpg" alt="Q-Learning" width="100%"/>

训练循环是这样的:

```
对全部训练回合中的每个回合:

减小 epsilon(因为我们需要的探索越来越少)
重置环境

  在最大时间步数内逐步循环:
    使用 epsilon 贪婪策略选择动作 At
    执行动作 (a),观察结果状态 (s') 和奖励 (r)
    使用贝尔曼方程更新 Q 值:Q(s,a) + lr [R(s,a) + gamma * max Q(s',a') - Q(s,a)]
    如果结束,则结束本回合
    我们的下一个状态就是新状态
```

```python
def train(n_training_episodes, min_epsilon, max_epsilon, decay_rate, env, max_steps, Qtable):
  for episode in tqdm(range(n_training_episodes)):
    # 减小 epsilon(因为我们需要的探索越来越少)
    epsilon = min_epsilon + (max_epsilon - min_epsilon)*np.exp(-decay_rate*episode)
    # 重置环境
    state, info = env.reset()
    step = 0
    terminated = False
    truncated = False

    # 重复
    for step in range(max_steps):
      # 使用 epsilon 贪婪策略选择动作 At
      action =

      # 执行动作 At,观察 Rt+1 和 St+1
      # 执行动作 (a),观察结果状态 (s') 和奖励 (r)
      new_state, reward, terminated, truncated, info =

      # 更新 Q(s,a):= Q(s,a) + lr [R(s,a) + gamma * max Q(s',a') - Q(s,a)]
      Qtable[state][action] =

      # 如果 terminated 或 truncated,结束本回合
      if terminated or truncated:
        break

      # 我们的下一个状态就是新状态
      state = new_state
  return Qtable
```

#### 解答

```python
def train(n_training_episodes, min_epsilon, max_epsilon, decay_rate, env, max_steps, Qtable):
    for episode in tqdm(range(n_training_episodes)):
        # 减小 epsilon(因为我们需要的探索越来越少)
        epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-decay_rate * episode)
        # 重置环境
        state, info = env.reset()
        step = 0
        terminated = False
        truncated = False

        # 重复
        for step in range(max_steps):
            # 使用 epsilon 贪婪策略选择动作 At
            action = epsilon_greedy_policy(Qtable, state, epsilon)

            # 执行动作 At,观察 Rt+1 和 St+1
            # 执行动作 (a),观察结果状态 (s') 和奖励 (r)
            new_state, reward, terminated, truncated, info = env.step(action)

            # 更新 Q(s,a):= Q(s,a) + lr [R(s,a) + gamma * max Q(s',a') - Q(s,a)]
            Qtable[state][action] = Qtable[state][action] + learning_rate * (
                reward + gamma * np.max(Qtable[new_state]) - Qtable[state][action]
            )

            # 如果 terminated 或 truncated,结束本回合
            if terminated or truncated:
                break

            # 我们的下一个状态就是新状态
            state = new_state
    return Qtable
```

## 训练 Q-Learning 智能体 🏃

```python
Qtable_frozenlake = train(n_training_episodes, min_epsilon, max_epsilon, decay_rate, env, max_steps, Qtable_frozenlake)
```

## 看看现在我们的 Q-Learning 表长什么样 👀

```python
Qtable_frozenlake
```

## 评估方法 📝

- 我们已经定义了用于测试 Q-Learning 智能体的评估方法。

```python
def evaluate_agent(env, max_steps, n_eval_episodes, Q, seed):
    """
    Evaluate the agent for ``n_eval_episodes`` episodes and returns average reward and std of reward.
    :param env: The evaluation environment
    :param n_eval_episodes: Number of episode to evaluate the agent
    :param Q: The Q-table
    :param seed: The evaluation seed array (for taxi-v3)
    """
    episode_rewards = []
    for episode in tqdm(range(n_eval_episodes)):
        if seed:
            state, info = env.reset(seed=seed[episode])
        else:
            state, info = env.reset()
        step = 0
        truncated = False
        terminated = False
        total_rewards_ep = 0

        for step in range(max_steps):
            # 给定该状态,采取期望未来奖励最大的动作(索引)
            action = greedy_policy(Q, state)
            new_state, reward, terminated, truncated, info = env.step(action)
            total_rewards_ep += reward

            if terminated or truncated:
                break
            state = new_state
        episode_rewards.append(total_rewards_ep)
    mean_reward = np.mean(episode_rewards)
    std_reward = np.std(episode_rewards)

    return mean_reward, std_reward
```

## 评估我们的 Q-Learning 智能体 📈

- 通常,你的平均奖励应该达到 1.0
- 由于状态空间非常小(16),**这个环境相对简单**。你可以尝试[把它换成打滑版本](https://www.gymlibrary.dev/environments/toy_text/frozen_lake/),它会引入随机性,让环境更复杂。

```python
# 评估我们的智能体
mean_reward, std_reward = evaluate_agent(env, max_steps, n_eval_episodes, Qtable_frozenlake, eval_seed)
print(f"Mean_reward={mean_reward:.2f} +/- {std_reward:.2f}")
```

## 把训练好的模型发布到 Hub 🔥

训练之后我们看到结果不错,**只需一行代码,就可以把训练好的模型发布到 Hub 🤗**。

下面是一个模型卡(Model Card)的例子:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit2/modelcard.png" alt="Model card" width="100%"/>


在底层,Hub 使用基于 git 的仓库(如果你不了解 git 也不用担心),这意味着在你不断实验和改进智能体的过程中,可以用新版本更新模型。

#### 不要修改这段代码

```python
from huggingface_hub import HfApi, snapshot_download
from huggingface_hub.repocard import metadata_eval_result, metadata_save

from pathlib import Path
import datetime
import json
```

```python
def record_video(env, Qtable, out_directory, fps=1):
    """
    Generate a replay video of the agent
    :param env
    :param Qtable: Qtable of our agent
    :param out_directory
    :param fps: how many frame per seconds (with taxi-v3 and frozenlake-v1 we use 1)
    """
    images = []
    terminated = False
    truncated = False
    state, info = env.reset(seed=random.randint(0, 500))
    img = env.render()
    images.append(img)
    while not terminated or truncated:
        # 给定该状态,采取期望未来奖励最大的动作(索引)
        action = np.argmax(Qtable[state][:])
        state, reward, terminated, truncated, info = env.step(
            action
        )  # 为了录制逻辑,我们直接令 next_state = state
        img = env.render()
        images.append(img)
    imageio.mimsave(out_directory, [np.array(img) for i, img in enumerate(images)], fps=fps)
```

```python
def push_to_hub(repo_id, model, env, video_fps=1, local_repo_path="hub"):
    """
    Evaluate, Generate a video and Upload a model to Hugging Face Hub.
    This method does the complete pipeline:
    - It evaluates the model
    - It generates the model card
    - It generates a replay video of the agent
    - It pushes everything to the Hub

    :param repo_id: repo_id: id of the model repository from the Hugging Face Hub
    :param env
    :param video_fps: how many frame per seconds to record our video replay
    (with taxi-v3 and frozenlake-v1 we use 1)
    :param local_repo_path: where the local repository is
    """
    _, repo_name = repo_id.split("/")

    eval_env = env
    api = HfApi()

    # 第 1 步:创建仓库
    repo_url = api.create_repo(
        repo_id=repo_id,
        exist_ok=True,
    )

    # 第 2 步:下载文件
    repo_local_path = Path(snapshot_download(repo_id=repo_id))

    # 第 3 步:保存模型
    if env.spec.kwargs.get("map_name"):
        model["map_name"] = env.spec.kwargs.get("map_name")
        if env.spec.kwargs.get("is_slippery", "") == False:
            model["slippery"] = False

    # 用 pickle 序列化模型
    with open((repo_local_path) / "q-learning.pkl", "wb") as f:
        pickle.dump(model, f)

    # 第 4 步:评估模型并生成包含评估指标的 JSON
    mean_reward, std_reward = evaluate_agent(
        eval_env, model["max_steps"], model["n_eval_episodes"], model["qtable"], model["eval_seed"]
    )

    evaluate_data = {
        "env_id": model["env_id"],
        "mean_reward": mean_reward,
        "n_eval_episodes": model["n_eval_episodes"],
        "eval_datetime": datetime.datetime.now().isoformat(),
    }

    # 写入一个名为 "results.json" 的 JSON 文件,
    # 其中包含评估结果
    with open(repo_local_path / "results.json", "w") as outfile:
        json.dump(evaluate_data, outfile)

    # 第 5 步:创建模型卡
    env_name = model["env_id"]
    if env.spec.kwargs.get("map_name"):
        env_name += "-" + env.spec.kwargs.get("map_name")

    if env.spec.kwargs.get("is_slippery", "") == False:
        env_name += "-" + "no_slippery"

    metadata = {}
    metadata["tags"] = [env_name, "q-learning", "reinforcement-learning", "custom-implementation"]

    # 添加指标
    eval = metadata_eval_result(
        model_pretty_name=repo_name,
        task_pretty_name="reinforcement-learning",
        task_id="reinforcement-learning",
        metrics_pretty_name="mean_reward",
        metrics_id="mean_reward",
        metrics_value=f"{mean_reward:.2f} +/- {std_reward:.2f}",
        dataset_pretty_name=env_name,
        dataset_id=env_name,
    )

    # 合并两个字典
    metadata = {**metadata, **eval}

    model_card = f"""
  # **Q-Learning** Agent playing1 **{env_id}**
  This is a trained model of a **Q-Learning** agent playing **{env_id}** .

  ## Usage

  model = load_from_hub(repo_id="{repo_id}", filename="q-learning.pkl")

  # Don't forget to check if you need to add additional attributes (is_slippery=False etc)
  env = gym.make(model["env_id"])
  """

    evaluate_agent(env, model["max_steps"], model["n_eval_episodes"], model["qtable"], model["eval_seed"])

    readme_path = repo_local_path / "README.md"
    readme = ""
    print(readme_path.exists())
    if readme_path.exists():
        with readme_path.open("r", encoding="utf8") as f:
            readme = f.read()
    else:
        readme = model_card

    with readme_path.open("w", encoding="utf-8") as f:
        f.write(readme)

    # 把指标保存到 Readme 元数据中
    metadata_save(readme_path, metadata)

    # 第 6 步:录制视频
    video_path = repo_local_path / "replay.mp4"
    record_video(env, model["qtable"], video_path, video_fps)

    # 第 7 步:把所有内容推送到 Hub
    api.upload_folder(
        repo_id=repo_id,
        folder_path=repo_local_path,
        path_in_repo=".",
    )

    print("Your model is pushed to the Hub. You can view your model here: ", repo_url)
```

### .

使用 `push_to_hub`,**你可以评估、录制回放、为智能体生成模型卡,并把它推送到 Hub**。

这样一来:
- 你可以**展示自己的作品** 🔥
- 你可以**观看智能体的表现** 👀
- 你可以**把智能体分享给社区,供他人使用** 💾
- 你可以**访问排行榜 🏆,看看自己的智能体与同学相比表现如何** 👉 https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard


要把模型分享给社区,还需要完成三个步骤:

1️⃣(如果还没有的话)注册一个 HF 账号 ➡ https://huggingface.co/join

2️⃣ 登录后,你需要保存来自 Hugging Face 网站的认证令牌(token)。
- 创建一个新令牌(https://huggingface.co/settings/tokens),**并赋予 write 角色**


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="Create HF Token">


```python
from huggingface_hub import notebook_login

notebook_login()
```

如果你不想使用 Google Colab 或 Jupyter Notebook,则需要改用这个命令:`huggingface-cli login`(或 `login`)

3️⃣ 现在我们可以用 `push_to_hub()` 函数把训练好的智能体推送到 🤗 Hub 了 🔥

- 我们来创建**包含超参数和 Q 表的模型字典**。

```python
model = {
    "env_id": env_id,
    "max_steps": max_steps,
    "n_training_episodes": n_training_episodes,
    "n_eval_episodes": n_eval_episodes,
    "eval_seed": eval_seed,
    "learning_rate": learning_rate,
    "gamma": gamma,
    "max_epsilon": max_epsilon,
    "min_epsilon": min_epsilon,
    "decay_rate": decay_rate,
    "qtable": Qtable_frozenlake,
}
```

我们来填写 `push_to_hub` 函数的参数:

- `repo_id`:将要创建/更新的 Hugging Face Hub 仓库名称 `
(repo_id = {username}/{repo_name})`
💡 一个好的 `repo_id` 是 `{username}/q-{env_id}`
- `model`:包含超参数和 Q 表的模型字典。
- `env`:环境。
- `commit_message`:提交信息

```python
model
```

```python
username = ""  # 填写这里
repo_name = "q-FrozenLake-v1-4x4-noSlippery"
push_to_hub(repo_id=f"{username}/{repo_name}", model=model, env=env)
```

恭喜 🥳 你刚刚从零实现、训练并上传了你的第一个强化学习智能体。FrozenLake-v1 不打滑版是一个非常简单的环境,我们来试试更难的一个 🔥。

# 第 2 部分:Taxi-v3 🚖

## 创建并了解 [Taxi-v3 🚕](https://gymnasium.farama.org/environments/toy_text/taxi/)
---

💡 开始使用一个环境时,一个好习惯是先查看它的文档

👉 https://gymnasium.farama.org/environments/toy_text/taxi/

---

在 `Taxi-v3` 🚕 中,网格世界里有四个指定地点,分别用 R(红)、G(绿)、Y(黄)和 B(蓝)表示。

回合开始时,**出租车会出现在随机的一个方格上**,乘客也位于随机位置。出租车开到乘客所在位置,**接上乘客**,再开到乘客的目的地(四个指定地点中的另一个),然后**让乘客下车**。乘客下车后,回合结束。


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit2/taxi.png" alt="Taxi">


```python
env = gym.make("Taxi-v3", render_mode="rgb_array")
```

一共有 **500 个离散状态,因为出租车有 25 个可能位置、乘客有 5 种可能位置**(包括乘客在车上的情况),还有 **4 个目的地**。


```python
state_space = env.observation_space.n
print("There are ", state_space, " possible states")
```

```python
action_space = env.action_space.n
print("There are ", action_space, " possible actions")
```

动作空间(智能体可以采取的所有可能动作的集合)是离散的,共有 **6 个可用动作 🎮**:

- 0:向南移动
- 1:向北移动
- 2:向东移动
- 3:向西移动
- 4:接上乘客
- 5:让乘客下车

奖励函数 💰:

- 每步 -1,除非触发了其他奖励。
- 送达乘客 +20。
- 非法执行"接上乘客"和"让乘客下车"动作 -10。

```python
# 创建行数为状态数、列数为动作数 (500x6) 的 Q 表
Qtable_taxi = initialize_q_table(state_space, action_space)
print(Qtable_taxi)
print("Q-table shape: ", Qtable_taxi.shape)
```

## 定义超参数 ⚙️

⚠ 不要修改 EVAL_SEED:eval_seed 数组**让我们可以用相同的出租车起始位置来评估每一位同学的智能体**

```python
# 训练参数
n_training_episodes = 25000  # 总训练回合数
learning_rate = 0.7  # 学习率

# 评估参数
n_eval_episodes = 100  # 测试回合总数

# 不要修改 EVAL_SEED
eval_seed = [
    16,
    54,
    165,
    177,
    191,
    191,
    120,
    80,
    149,
    178,
    48,
    38,
    6,
    125,
    174,
    73,
    50,
    172,
    100,
    148,
    146,
    6,
    25,
    40,
    68,
    148,
    49,
    167,
    9,
    97,
    164,
    176,
    61,
    7,
    54,
    55,
    161,
    131,
    184,
    51,
    170,
    12,
    120,
    113,
    95,
    126,
    51,
    98,
    36,
    135,
    54,
    82,
    45,
    95,
    89,
    59,
    95,
    124,
    9,
    113,
    58,
    85,
    51,
    134,
    121,
    169,
    105,
    21,
    30,
    11,
    50,
    65,
    12,
    43,
    82,
    145,
    152,
    97,
    106,
    55,
    31,
    85,
    38,
    112,
    102,
    168,
    123,
    97,
    21,
    83,
    158,
    26,
    80,
    63,
    5,
    81,
    32,
    11,
    28,
    148,
]  # 评估种子,确保所有同学的智能体都在相同的出租车起始位置上训练
# 每个种子对应一个特定的起始状态

# 环境参数
env_id = "Taxi-v3"  # 环境名称
max_steps = 99  # 每个回合的最大步数
gamma = 0.95  # 折扣率

# 探索参数
max_epsilon = 1.0  # 初始探索概率
min_epsilon = 0.05  # 最小探索概率
decay_rate = 0.005  # 探索概率的指数衰减率
```

## 训练我们的 Q-Learning 智能体 🏃

```python
Qtable_taxi = train(n_training_episodes, min_epsilon, max_epsilon, decay_rate, env, max_steps, Qtable_taxi)
Qtable_taxi
```

## 创建模型字典 💾 并把训练好的模型发布到 Hub 🔥

- 我们创建一个模型字典,其中包含所有训练超参数(以便复现)和 Q 表。


```python
model = {
    "env_id": env_id,
    "max_steps": max_steps,
    "n_training_episodes": n_training_episodes,
    "n_eval_episodes": n_eval_episodes,
    "eval_seed": eval_seed,
    "learning_rate": learning_rate,
    "gamma": gamma,
    "max_epsilon": max_epsilon,
    "min_epsilon": min_epsilon,
    "decay_rate": decay_rate,
    "qtable": Qtable_taxi,
}
```

```python
username = ""  # 填写这里
repo_name = ""  # 填写这里
push_to_hub(repo_id=f"{username}/{repo_name}", model=model, env=env)
```

模型已经放到 Hub 上了,现在你可以用排行榜 🏆 把自己的 Taxi-v3 结果与同学们比较 👉 https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit2/taxi-leaderboard.png" alt="Taxi Leaderboard">

# 第 3 部分:从 Hub 加载 🔽

Hugging Face Hub 🤗 的妙处在于,你可以轻松地从社区加载强大的模型。

从 Hub 加载一个已保存的模型非常简单:

1. 打开 https://huggingface.co/models?other=q-learning,查看所有已保存的 q-learning 模型列表。
2. 选一个模型,复制它的 repo_id

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit2/copy-id.png" alt="Copy id">

3. 然后我们只需要使用 `load_from_hub`,并提供:
- repo_id
- filename:仓库中已保存的模型文件。

#### 不要修改这段代码

```python
from urllib.error import HTTPError

from huggingface_hub import hf_hub_download


def load_from_hub(repo_id: str, filename: str) -> str:
    """
    Download a model from Hugging Face Hub.
    :param repo_id: id of the model repository from the Hugging Face Hub
    :param filename: name of the model zip file from the repository
    """
    # 从 Hub 获取模型,下载并缓存到本地磁盘
    pickle_model = hf_hub_download(repo_id=repo_id, filename=filename)

    with open(pickle_model, "rb") as f:
        downloaded_model_file = pickle.load(f)

    return downloaded_model_file
```

### .

```python
model = load_from_hub(repo_id="ThomasSimonini/q-Taxi-v3", filename="q-learning.pkl")  # 试着使用另一个模型

print(model)
env = gym.make(model["env_id"])

evaluate_agent(env, model["max_steps"], model["n_eval_episodes"], model["qtable"], model["eval_seed"])
```

```python
model = load_from_hub(
    repo_id="ThomasSimonini/q-FrozenLake-v1-no-slippery", filename="q-learning.pkl"
)  # 试着使用另一个模型

env = gym.make(model["env_id"], is_slippery=False)

evaluate_agent(env, model["max_steps"], model["n_eval_episodes"], model["qtable"], model["eval_seed"])
```

## 一些额外的挑战 🏆

学习的最好方式**就是自己动手尝试**!如你所见,当前的智能体表现得还不够好。第一个建议是:增加训练步数。在 1,000,000 步时,我们看到了非常好的结果!

在[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)中你会看到你的智能体。你能冲到榜首吗?

下面是一些冲击排行榜的思路:

* 增加训练步数
* 参考同学们的做法,尝试不同的超参数
* **把新训练的模型推送**到 Hub 🔥

觉得在冰上走路和开出租车太无聊了?试着**换个环境**吧,比如 FrozenLake-v1 打滑版怎么样?通过 [Gymnasium 文档](https://gymnasium.farama.org/)了解这些环境的工作方式,玩得开心 🎉。

_____________________________________________________________________
恭喜 🥳,你刚刚实现、训练并上传了你的第一个强化学习智能体。

理解 Q-Learning 是**理解基于价值的方法的重要一步。**

在下一单元的 Deep Q-Learning 中,我们会看到:虽然创建和更新 Q 表是个好办法——**但它不具备可扩展性。**

例如,想象你要创建一个学习玩 Doom 的智能体。

<img src="https://vizdoom.cs.put.edu.pl/user/pages/01.tutorial/basic.png" alt="Doom"/>

Doom 是一个状态空间极其庞大的大型环境(有数百万个不同的状态)。为这样的环境创建并更新 Q 表并不高效。

这就是为什么我们将在下一单元学习 Deep Q-Learning,这种算法**使用一个神经网络,在给定状态时近似每个动作对应的各个 Q 值。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/atari-envs.gif" alt="Environments"/>


第 3 单元见!🔥

## 持续学习,保持出色 🤗
