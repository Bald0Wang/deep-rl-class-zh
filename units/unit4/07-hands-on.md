> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/hands-on.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/hands-on.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 动手实践



      <CourseFloatingBanner classNames="absolute z-10 right-0 top-0"
      notebooks={[
        {label: "Google Colab", value: "https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/notebooks/unit4/unit4.ipynb"}
        ]}
        askForHelpUrl="http://hf.co/join/discord" />



我们已经学习了 Reinforce 背后的理论,**现在你可以用 PyTorch 编写你的 Reinforce 智能体了**。接下来你将用 CartPole-v1 和 PixelCopter 来测试它的鲁棒性。

之后,你就能在这个实现的基础上不断迭代和改进,去应对更高级的环境。

<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/envs.gif" alt="环境"/>
</figure>


要通过认证流程中对本次动手实践的验证,你需要把训练好的模型推送到 Hub,并且:

- `Cartpole-v1` 的成绩达到 >= 350
- `PixelCopter` 的成绩达到 >= 5

要查看你的成绩,请到排行榜上找到你的模型,**成绩 = mean_reward - 奖励的标准差**。**如果排行榜上看不到你的模型,请到排行榜页面底部点击刷新按钮**。

**如果你找不到自己的模型,请到页面底部点击刷新按钮。**

想了解认证流程的更多信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

你可以在这里查看自己的学习进度 👉 https://huggingface.co/spaces/ThomasSimonini/Check-my-progress-Deep-RL-Course


**点击 Open In Colab 按钮,开始动手实践** 👇:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/unit4/unit4.ipynb)

我们强烈**建议学员使用 Google Colab 来完成动手练习**,而不是在自己的个人电脑上运行。

使用 Google Colab,**你可以专注于学习和实验,不必为搭建环境的技术细节操心**。

# 第 4 单元:用 PyTorch 编写你的第一个深度强化学习算法:Reinforce,并测试它的鲁棒性 💪

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/thumbnail.png" alt="缩略图"/>


在这个 notebook 中,你将从零开始编写你的第一个深度强化学习算法:Reinforce(也叫蒙特卡洛策略梯度,Monte Carlo Policy Gradient)。

Reinforce 是一种*策略方法(Policy-based method)*:一种深度强化学习算法,它尝试**不借助动作价值函数、直接优化策略**。

更准确地说,Reinforce 是一种*策略梯度方法*,它是*策略方法*的一个子类,目标是**通过梯度上升估计最优策略的权重,从而直接优化策略**。

为了测试它的鲁棒性,我们将在两个不同的简单环境中训练它:
- Cartpole-v1
- PixelcopterEnv

⬇️ 下面是**你完成本 notebook 后能实现的效果**示例 ⬇️

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/envs.gif" alt="环境"/>


### 🎮 环境:

- [CartPole-v1](https://www.gymlibrary.dev/environments/classic_control/cart_pole/)
- [PixelCopter](https://pygame-learning-environment.readthedocs.io/en/latest/user/games/pixelcopter.html)

### 📚 RL 库:

- Python
- PyTorch


我们一直在努力改进教程,如果你**在本 notebook 中发现了问题**,请[在 GitHub 仓库上提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

## 本 notebook 的目标 🏆

完成本 notebook 后,你将能够:

- **使用 PyTorch 从零编写一个 Reinforce 算法**。
- **使用简单环境测试你的智能体的鲁棒性**。
- 把训练好的智能体**推送到 Hub**,并附上精美的回放视频和评估分数 🔥。

## 前置要求 🏗️

在深入本 notebook 之前,你需要:

🔲 📚 [阅读第 4 单元,学习策略梯度](https://huggingface.co/deep-rl-course/unit4/introduction)

# 从零开始编写 Reinforce 算法 🔥

## 一些建议 💡

最好先在你的 Google Drive 中保存一份副本,再运行这个 Colab,这样**即使它超时了**,你的 Google Drive 上仍有保存好的 notebook,不用从头重新填写。

为此,你可以按 `Ctrl + S`,或者选择 `File > Save a copy in Google Drive.`(文件 > 保存副本到云端硬盘)。

## 设置 GPU 💪

- 为了**加速智能体的训练,我们将使用 GPU**。为此,请进入 `Runtime > Change Runtime type`(运行时 > 更改运行时类型)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step1.jpg" alt="GPU 步骤 1">

- `Hardware Accelerator > GPU`(硬件加速器 > GPU)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step2.jpg" alt="GPU 步骤 2">

## 创建虚拟显示器 🖥

在本 notebook 中,我们需要生成回放视频。在 Colab 上要做到这一点,**必须有一个虚拟屏幕才能渲染环境**(从而录制帧画面)。

下面的单元格会安装所需的库,并创建和启动一个虚拟屏幕 🖥

```python
%%capture
!apt install python-opengl
!apt install ffmpeg
!apt install xvfb
!pip install pyvirtualdisplay
!pip install pyglet==1.5.1
```

```python
# 虚拟显示器
from pyvirtualdisplay import Display

virtual_display = Display(visible=0, size=(1400, 900))
virtual_display.start()
```

## 安装依赖 🔽

第一步是安装依赖。我们要安装好几个库:

- `gym`
- `gym-games`:用 PyGame 制作的额外 gym 环境。
- `huggingface_hub`:Hub 是一个中心平台,任何人都可以在上面分享和探索模型与数据集。它提供版本管理、指标、可视化等功能,让你能轻松与他人协作。

你可能会问:为什么我们安装 gym,而不是 gymnasium(gym 的更新版本)?**因为我们使用的 gym-games 还没有适配 gymnasium**。

你会遇到的差异如下:
- 在 `gym` 中没有 `terminated` 和 `truncated`,只有 `done`。
- 在 `gym` 中,`env.step()` 返回 `state, reward, done, info`

你可以在这里进一步了解 Gym 与 Gymnasium 的区别 👉 https://gymnasium.farama.org/content/migration-guide/

你可以在这里看到所有可用的 Reinforce 模型 👉 https://huggingface.co/models?other=reinforce

所有深度强化学习模型都可以在这里找到 👉 https://huggingface.co/models?pipeline_tag=reinforcement-learning


```bash
!pip install -r https://raw.githubusercontent.com/huggingface/deep-rl-class/main/notebooks/unit4/requirements-unit4.txt
```

## 导入所需的包 📦

除了导入刚安装的库之外,我们还要导入:

- `imageio`:一个帮我们生成回放视频的库



```python
import numpy as np

from collections import deque

import matplotlib.pyplot as plt
%matplotlib inline

# PyTorch
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.distributions import Categorical

# Gym
import gym
import gym_pygame

# Hugging Face Hub
from huggingface_hub import notebook_login # 登录我们的 Hugging Face 账号,以便能把模型上传到 Hub。
import imageio
```

## 检查我们是否有 GPU

- 来检查一下有没有 GPU
- 如果有的话,你应该会看到 `device:cuda0`

```python
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
```

```python
print(device)
```

现在,我们已经准备好实现 Reinforce 算法了 🔥

# 第一个智能体:玩 CartPole-v1 🤖

## 创建 CartPole 环境并理解它的工作方式

### [环境介绍 🎮](https://www.gymlibrary.dev/environments/classic_control/cart_pole/)

### 为什么使用 CartPole-v1 这样简单的环境?

正如 [Reinforcement Learning Tips and Tricks](https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html) 中所解释的,从零开始实现智能体时,你需要**先确保它能正确工作,并在简单的环境中找出 bug,然后再深入更复杂的场景**,因为在简单环境中调试要容易得多。


> 先在玩具问题上看到一些"生命的迹象"


> 让实现在越来越难的环境中运行,以此验证实现(你可以对照 RL zoo 的结果进行比较)。这一步通常需要进行超参数优化。


### CartPole-v1 环境

> 一根杆通过一个无驱动关节连接到小车上,小车沿无摩擦的轨道移动。摆杆初始时竖直立在小车上,目标是通过对小车施加向左或向右的力,让杆保持平衡。



那么,我们从 CartPole-v1 开始。目标是把小车向左或向右推,**让杆保持平衡**。

出现以下情况时,回合结束:
- 杆的角度大于 ±12°
- 小车位置大于 ±2.4
- 回合长度大于 500

只要杆保持平衡,每个时间步我们都会获得 +1 的奖励 💰。

```python
env_id = "CartPole-v1"
# 创建环境
env = gym.make(env_id)

# 创建评估环境
eval_env = gym.make(env_id)

# 获取状态空间和动作空间
s_size = env.observation_space.shape[0]
a_size = env.action_space.n
```

```python
print("_____OBSERVATION SPACE_____ \n")
print("The State Space is: ", s_size)
print("Sample observation", env.observation_space.sample())  # 获取一个随机观测
```

```python
print("\n _____ACTION SPACE_____ \n")
print("The Action Space is: ", a_size)
print("Action Space Sample", env.action_space.sample())  # 随机选择一个动作
```

## 我们来构建 Reinforce 的网络结构

这个实现基于以下三个实现:
- [PyTorch 官方强化学习示例](https://github.com/pytorch/examples/blob/main/reinforcement_learning/reinforce.py)
- [Udacity Reinforce](https://github.com/udacity/deep-reinforcement-learning/blob/master/reinforce/REINFORCE.ipynb)
- [Chris1nexus 对集成的改进](https://github.com/huggingface/deep-rl-class/pull/95)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/reinforce.png" alt="Reinforce"/>

我们想要:
- 两个全连接层(fc1 和 fc2)。
- fc1 使用 ReLU 作为激活函数
- 用 Softmax 输出动作上的概率分布

```python
class Policy(nn.Module):
    def __init__(self, s_size, a_size, h_size):
        super(Policy, self).__init__()
        # 创建两个全连接层



    def forward(self, x):
        # 定义前向传播
        # 状态输入 fc1,然后应用 ReLU 激活函数

        # fc1 的输出进入 fc2

        # 输出 softmax

    def act(self, state):
        """
        给定一个状态,选择动作
        """
        state = torch.from_numpy(state).float().unsqueeze(0).to(device)
        probs = self.forward(state).cpu()
        m = Categorical(probs)
        action = np.argmax(m)
        return action.item(), m.log_prob(action)
```

### 解答

```python
class Policy(nn.Module):
    def __init__(self, s_size, a_size, h_size):
        super(Policy, self).__init__()
        self.fc1 = nn.Linear(s_size, h_size)
        self.fc2 = nn.Linear(h_size, a_size)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return F.softmax(x, dim=1)

    def act(self, state):
        state = torch.from_numpy(state).float().unsqueeze(0).to(device)
        probs = self.forward(state).cpu()
        m = Categorical(probs)
        action = np.argmax(m)
        return action.item(), m.log_prob(action)
```

我犯了一个错误,你能猜到在哪里吗?

- 我们来做一次前向传播看看:

```python
debug_policy = Policy(s_size, a_size, 64).to(device)
debug_policy.act(env.reset())
```

- 可以看到,报错信息是 `ValueError: The value argument to log_prob must be a Tensor`

- 这意味着 `m.log_prob(action)` 中的 `action` 必须是一个张量,**但它并不是**。

- 你知道为什么吗?检查一下 act 函数,试着找出它无法工作的原因。

提示 💡:这个实现有问题。记住,对 act 函数而言,**我们要从动作的概率分布中采样一个动作**。


### (真正的)解答

```python
class Policy(nn.Module):
    def __init__(self, s_size, a_size, h_size):
        super(Policy, self).__init__()
        self.fc1 = nn.Linear(s_size, h_size)
        self.fc2 = nn.Linear(h_size, a_size)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return F.softmax(x, dim=1)

    def act(self, state):
        state = torch.from_numpy(state).float().unsqueeze(0).to(device)
        probs = self.forward(state).cpu()
        m = Categorical(probs)
        action = m.sample()
        return action.item(), m.log_prob(action)
```

使用 CartPole 让调试更容易,因为**我们明确知道 bug 来自我们自己的集成代码,而不是来自那个简单环境**。

- 由于**我们要从动作的概率分布中采样动作**,不能用 `action = np.argmax(m)`,因为它总是输出概率最高的那个动作。

- 我们需要把它替换成 `action = m.sample()`,它会从概率分布 P(.|s) 中采样一个动作。

### 我们来构建 Reinforce 训练算法
下面是 Reinforce 算法的伪代码:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/pg_pseudocode.png" alt="策略梯度伪代码"/>


- 当我们计算回报 Gt(伪代码第 6 行)时,可以看到我们计算的是**从时间步 t 开始**的折扣奖励之和。

- 为什么呢?因为我们的策略只应该**根据动作产生的后果来强化动作**:在采取某个动作之前获得的奖励是无用的(因为它们并不是由该动作导致的),**只有动作之后出现的奖励才重要**。

- 在编写代码之前,你应该先阅读 [don't let the past distract you](https://spinningup.openai.com/en/latest/spinningup/rl_intro3.html#don-t-let-the-past-distract-you) 这一节,它解释了我们为什么使用 reward-to-go(仅计未来奖励)策略梯度。

我们使用了一个由 [Chris1nexus](https://github.com/Chris1nexus) 编写的巧妙技巧来**高效计算每个时间步的回报**。代码注释解释了具体做法。也欢迎[查看这个 PR 的说明](https://github.com/huggingface/deep-rl-class/pull/95)。
总的来说,其思路就是**高效地计算每个时间步的回报**。

你可能想问的第二个问题是:**为什么我们要最小化损失**?前面讲的不是梯度上升(Gradient Ascent)而不是梯度下降(Gradient Descent)吗?

- 我们想最大化效用函数 $J(\theta)$,但在 PyTorch 和 TensorFlow 中,**最小化一个目标函数**更方便。
    - 假设我们想在某个时间步强化动作 3。训练之前,这个动作的概率 P 是 0.25。
    - 于是我们想调整 \\(theta \\),使得 \\(\pi_\theta(a_3|s; \theta) > 0.25 \\)
    - 由于所有概率 P 之和必须为 1,最大化 \\(pi_\theta(a_3|s; \theta)\\) 就会**最小化其他动作的概率**。
    - 所以我们应该告诉 PyTorch **去最小化 \\(1 - \pi_\theta(a_3|s; \theta)\\)**。
    - 当 \\(\pi_\theta(a_3|s; \theta)\\) 接近 1 时,这个损失函数趋近于 0。
    - 这样我们就在引导梯度去最大化 \\(\pi_\theta(a_3|s; \theta)\\)


```python
def reinforce(policy, optimizer, n_training_episodes, max_t, gamma, print_every):
    # 帮助我们在训练过程中计算分数
    scores_deque = deque(maxlen=100)
    scores = []
    # 伪代码第 3 行
    for i_episode in range(1, n_training_episodes+1):
        saved_log_probs = []
        rewards = []
        state = # TODO: 重置环境
        # 伪代码第 4 行
        for t in range(max_t):
            action, log_prob = # TODO: 获取动作
            saved_log_probs.append(log_prob)
            state, reward, done, _ = # TODO: 执行一步环境交互
            rewards.append(reward)
            if done:
                break
        scores_deque.append(sum(rewards))
        scores.append(sum(rewards))

        # 伪代码第 6 行:计算回报
        returns = deque(maxlen=max_t)
        n_steps = len(rewards)
        # 计算每个时间步的折扣回报,
        # 即:时间 t 的 gamma 折扣回报 (G_t) 与时间 t 的奖励之和

        # 时间复杂度为 O(N),其中 N 是时间步数
        # (折扣回报 G_t 的这一定义遵循 Sutton&Barto 2017 第二版草稿
        # 第 44 页中对该量的定义)
        # G_t = r_(t+1) + r_(t+2) + ...

        # 基于这一形式,每个时间步 t 的回报都可以通过
        # 复用已经算出的未来回报 G_(t+1) 来计算当前回报 G_t
        # G_t = r_(t+1) + gamma*G_(t+1)
        # G_(t-1) = r_t + gamma* G_t
        # (这里采用了动态规划的思路:把已经求出的解记下来,
        # 以避免重复计算)

        # 这样做是正确的,因为上式等价于(另见 Sutton&Barto 2017 第二版草稿第 46 页)
        # G_(t-1) = r_t + gamma*r_(t+1) + gamma*gamma*r_(t+2) + ...


        ## 基于上述内容,我们把时间步 t 的回报计算为:
        #               gamma[t] * return[t] + reward[t]
        #
        ## 我们从最后一个时间步算到第一个时间步,以便
        ## 直接使用上面给出的公式,并避免按从先到后的顺序
        ## 计算时所需的重复运算。

        ## 因此,得益于 appendleft() 函数能以常数时间 O(1) 在位置 0 插入元素,
        ## 队列 "returns" 会按时间顺序(从 t=0 到 t=n_steps)保存各时间步的回报;
        ## 如果用普通的 Python 列表来做同样的事,则需要 O(N) 的时间。
        for t in range(n_steps)[::-1]:
            disc_return_t = (returns[0] if len(returns)>0 else 0)
            returns.appendleft(    ) # TODO: 在这里补全

        ## 对回报做标准化,让训练更稳定
        eps = np.finfo(np.float32).eps.item()

        ## eps 是可表示的最小浮点数,
        # 把它加到回报的标准差上,以避免数值不稳定
        returns = torch.tensor(returns)
        returns = (returns - returns.mean()) / (returns.std() + eps)

        # 伪代码第 7 行:
        policy_loss = []
        for log_prob, disc_return in zip(saved_log_probs, returns):
            policy_loss.append(-log_prob * disc_return)
        policy_loss = torch.cat(policy_loss).sum()

        # 伪代码第 8 行:PyTorch 更倾向于梯度下降
        optimizer.zero_grad()
        policy_loss.backward()
        optimizer.step()

        if i_episode % print_every == 0:
            print('Episode {}\tAverage Score: {:.2f}'.format(i_episode, np.mean(scores_deque)))

    return scores
```

#### 解答

```python
def reinforce(policy, optimizer, n_training_episodes, max_t, gamma, print_every):
    # 帮助我们在训练过程中计算分数
    scores_deque = deque(maxlen=100)
    scores = []
    # 伪代码第 3 行
    for i_episode in range(1, n_training_episodes + 1):
        saved_log_probs = []
        rewards = []
        state = env.reset()
        # 伪代码第 4 行
        for t in range(max_t):
            action, log_prob = policy.act(state)
            saved_log_probs.append(log_prob)
            state, reward, done, _ = env.step(action)
            rewards.append(reward)
            if done:
                break
        scores_deque.append(sum(rewards))
        scores.append(sum(rewards))

        # 伪代码第 6 行:计算回报
        returns = deque(maxlen=max_t)
        n_steps = len(rewards)
        # 计算每个时间步的折扣回报,
        # 即:
        #      时间 t 的 gamma 折扣回报 (G_t) 与时间 t 的奖励之和
        #
        # 时间复杂度为 O(N),其中 N 是时间步数
        # (折扣回报 G_t 的这一定义遵循 Sutton&Barto 2017 第二版草稿
        # 第 44 页中对该量的定义)
        # G_t = r_(t+1) + r_(t+2) + ...

        # 基于这一形式,每个时间步 t 的回报都可以通过
        # 复用已经算出的未来回报 G_(t+1) 来计算当前回报 G_t
        # G_t = r_(t+1) + gamma*G_(t+1)
        # G_(t-1) = r_t + gamma* G_t
        # (这里采用了动态规划的思路:把已经求出的解记下来,
        # 以避免重复计算)

        # 这样做是正确的,因为上式等价于(另见 Sutton&Barto 2017 第二版草稿第 46 页)
        # G_(t-1) = r_t + gamma*r_(t+1) + gamma*gamma*r_(t+2) + ...

        ## 基于上述内容,我们把时间步 t 的回报计算为:
        #               gamma[t] * return[t] + reward[t]
        #
        ## 我们从最后一个时间步算到第一个时间步,以便
        ## 直接使用上面给出的公式,并避免按从先到后的顺序
        ## 计算时所需的重复运算。

        ## 因此,得益于 appendleft() 函数能以常数时间 O(1) 在位置 0 插入元素,
        ## 队列 "returns" 会按时间顺序(从 t=0 到 t=n_steps)保存各时间步的回报;
        ## 如果用普通的 Python 列表来做同样的事,则需要 O(N) 的时间。
        for t in range(n_steps)[::-1]:
            disc_return_t = returns[0] if len(returns) > 0 else 0
            returns.appendleft(gamma * disc_return_t + rewards[t])

        ## 对回报做标准化,让训练更稳定
        eps = np.finfo(np.float32).eps.item()
        ## eps 是可表示的最小浮点数,
        # 把它加到回报的标准差上,以避免数值不稳定
        returns = torch.tensor(returns)
        returns = (returns - returns.mean()) / (returns.std() + eps)

        # 伪代码第 7 行:
        policy_loss = []
        for log_prob, disc_return in zip(saved_log_probs, returns):
            policy_loss.append(-log_prob * disc_return)
        policy_loss = torch.cat(policy_loss).sum()

        # 伪代码第 8 行:PyTorch 更倾向于梯度下降
        optimizer.zero_grad()
        policy_loss.backward()
        optimizer.step()

        if i_episode % print_every == 0:
            print("Episode {}\tAverage Score: {:.2f}".format(i_episode, np.mean(scores_deque)))

    return scores
```

## 训练模型
- 现在我们已经准备好训练智能体了。
- 但首先,我们定义一个变量,其中包含所有训练超参数。
- 你可以修改这些训练参数(而且也应该这么做 😉)

```python
cartpole_hyperparameters = {
    "h_size": 16,
    "n_training_episodes": 1000,
    "n_evaluation_episodes": 10,
    "max_t": 1000,
    "gamma": 1.0,
    "lr": 1e-2,
    "env_id": env_id,
    "state_space": s_size,
    "action_space": a_size,
}
```

```python
# 创建策略并放到设备上
cartpole_policy = Policy(
    cartpole_hyperparameters["state_space"],
    cartpole_hyperparameters["action_space"],
    cartpole_hyperparameters["h_size"],
).to(device)
cartpole_optimizer = optim.Adam(cartpole_policy.parameters(), lr=cartpole_hyperparameters["lr"])
```

```python
scores = reinforce(
    cartpole_policy,
    cartpole_optimizer,
    cartpole_hyperparameters["n_training_episodes"],
    cartpole_hyperparameters["max_t"],
    cartpole_hyperparameters["gamma"],
    100,
)
```

## 定义评估方法 📝
- 在这里我们定义评估方法,用来测试我们的 Reinforce 智能体。

```python
def evaluate_agent(env, max_steps, n_eval_episodes, policy):
    """
    在 ``n_eval_episodes`` 个回合上评估智能体,返回平均奖励和奖励的标准差。
    :param env: 评估环境
    :param n_eval_episodes: 评估智能体所用的回合数
    :param policy: Reinforce 智能体
    """
    episode_rewards = []
    for episode in range(n_eval_episodes):
        state = env.reset()
        step = 0
        done = False
        total_rewards_ep = 0

        for step in range(max_steps):
            action, _ = policy.act(state)
            new_state, reward, done, info = env.step(action)
            total_rewards_ep += reward

            if done:
                break
            state = new_state
        episode_rewards.append(total_rewards_ep)
    mean_reward = np.mean(episode_rewards)
    std_reward = np.std(episode_rewards)

    return mean_reward, std_reward
```

## 评估我们的智能体 📈

```python
evaluate_agent(
    eval_env, cartpole_hyperparameters["max_t"], cartpole_hyperparameters["n_evaluation_episodes"], cartpole_policy
)
```

### 把训练好的模型发布到 Hub 🔥
现在我们看到训练之后取得了不错的结果,可以用一行代码把训练好的模型发布到 Hub 🤗。

下面是一个模型卡(Model Card)的示例:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/modelcard.png"/>

### 推送到 Hub
#### 请勿修改这段代码

```python
from huggingface_hub import HfApi, snapshot_download
from huggingface_hub.repocard import metadata_eval_result, metadata_save

from pathlib import Path
import datetime
import json
import imageio

import tempfile

import os
```

```python
def record_video(env, policy, out_directory, fps=30):
    """
    生成智能体的回放视频
    :param env
    :param Qtable: 我们智能体的 Q 表
    :param out_directory
    :param fps: 每秒帧数(taxi-v3 和 frozenlake-v1 使用 1)
    """
    images = []
    done = False
    state = env.reset()
    img = env.render(mode="rgb_array")
    images.append(img)
    while not done:
        # 在给定状态下,选择期望未来奖励最大的动作(索引)
        action, _ = policy.act(state)
        state, reward, done, info = env.step(action)  # 出于录制逻辑的考虑,我们直接令 next_state = state
        img = env.render(mode="rgb_array")
        images.append(img)
    imageio.mimsave(out_directory, [np.array(img) for i, img in enumerate(images)], fps=fps)
```

```python
def push_to_hub(repo_id,
                model,
                hyperparameters,
                eval_env,
                video_fps=30
                ):
  """
  评估模型、生成视频,并把模型上传到 Hugging Face Hub。
  这个方法完成完整的流程:
  - 评估模型
  - 生成模型卡
  - 生成智能体的回放视频
  - 把所有内容推送到 Hub

  :param repo_id: repo_id:Hugging Face Hub 上模型仓库的 id
  :param model: 我们想保存的 PyTorch 模型
  :param hyperparameters: 训练超参数
  :param eval_env: 评估环境
  :param video_fps: 录制回放视频的每秒帧数
  """

  _, repo_name = repo_id.split("/")
  api = HfApi()

  # 第 1 步:创建仓库
  repo_url = api.create_repo(
        repo_id=repo_id,
        exist_ok=True,
  )

  with tempfile.TemporaryDirectory() as tmpdirname:
    local_directory = Path(tmpdirname)

    # 第 2 步:保存模型
    torch.save(model, local_directory / "model.pt")

    # 第 3 步:把超参数保存为 JSON
    with open(local_directory / "hyperparameters.json", "w") as outfile:
      json.dump(hyperparameters, outfile)

    # 第 4 步:评估模型并生成 JSON
    mean_reward, std_reward = evaluate_agent(eval_env,
                                            hyperparameters["max_t"],
                                            hyperparameters["n_evaluation_episodes"],
                                            model)
    # 获取当前时间
    eval_datetime = datetime.datetime.now()
    eval_form_datetime = eval_datetime.isoformat()

    evaluate_data = {
          "env_id": hyperparameters["env_id"],
          "mean_reward": mean_reward,
          "n_evaluation_episodes": hyperparameters["n_evaluation_episodes"],
          "eval_datetime": eval_form_datetime,
    }

    # 写入 JSON 文件
    with open(local_directory / "results.json", "w") as outfile:
        json.dump(evaluate_data, outfile)

    # 第 5 步:创建模型卡
    env_name = hyperparameters["env_id"]

    metadata = {}
    metadata["tags"] = [
          env_name,
          "reinforce",
          "reinforcement-learning",
          "custom-implementation",
          "deep-rl-class"
      ]

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
  # **Reinforce** Agent playing **{env_id}**
  This is a trained model of a **Reinforce** agent playing **{env_id}** .
  To learn to use this model and train yours check Unit 4 of the Deep Reinforcement Learning Course: https://huggingface.co/deep-rl-course/unit4/introduction
  """

    readme_path = local_directory / "README.md"
    readme = ""
    if readme_path.exists():
        with readme_path.open("r", encoding="utf8") as f:
          readme = f.read()
    else:
      readme = model_card

    with readme_path.open("w", encoding="utf-8") as f:
      f.write(readme)

    # 把指标保存到 README 元数据中
    metadata_save(readme_path, metadata)

    # 第 6 步:录制视频
    video_path =  local_directory / "replay.mp4"
    record_video(env, model, video_path, video_fps)

    # 第 7 步:把所有内容推送到 Hub
    api.upload_folder(
          repo_id=repo_id,
          folder_path=local_directory,
          path_in_repo=".",
    )

    print(f"Your model is pushed to the Hub. You can view your model here: {repo_url}")
```

通过 `push_to_hub`,**你可以完成评估、录制回放、生成智能体的模型卡,并把它推送到 Hub**。

这样一来:
- 你可以**展示自己的成果** 🔥
- 你可以**观看你的智能体的实际表现** 👀
- 你可以**向社区分享一个他人也能使用的智能体** 💾
- 你可以**访问排行榜 🏆,看看你的智能体与同学们相比表现如何** 👉 https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard


要把模型分享给社区,还需要完成三个步骤:

1️⃣ (如果还没有的话)注册一个 HF 账号 ➡ https://huggingface.co/join

2️⃣ 登录之后,你需要保存来自 Hugging Face 网站的认证令牌(token)。
- 创建一个新令牌(https://huggingface.co/settings/tokens),**权限选择 write(写)**


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="创建 HF 令牌">


```python
notebook_login()
```

如果你不想使用 Google Colab 或 Jupyter Notebook,则需要改用这个命令:`huggingface-cli login`(或 `login`)

3️⃣ 现在我们可以使用 `package_to_hub()` 函数,把训练好的智能体推送到 🤗 Hub 了 🔥

```python
repo_id = ""  # TODO: 定义你的 repo id {username/Reinforce-{model-id}}
push_to_hub(
    repo_id,
    cartpole_policy,  # 我们想保存的模型
    cartpole_hyperparameters,  # 超参数
    eval_env,  # 评估环境
    video_fps=30
)
```

现在我们已经测试了实现的鲁棒性,接下来尝试一个更复杂的环境:PixelCopter 🚁





## 第二个智能体:PixelCopter 🚁

### 研究 PixelCopter 环境 👀
- [环境文档](https://pygame-learning-environment.readthedocs.io/en/latest/user/games/pixelcopter.html)


```python
env_id = "Pixelcopter-PLE-v0"
env = gym.make(env_id)
eval_env = gym.make(env_id)
s_size = env.observation_space.shape[0]
a_size = env.action_space.n
```

```python
print("_____OBSERVATION SPACE_____ \n")
print("The State Space is: ", s_size)
print("Sample observation", env.observation_space.sample())  # 获取一个随机观测
```

```python
print("\n _____ACTION SPACE_____ \n")
print("The Action Space is: ", a_size)
print("Action Space Sample", env.action_space.sample())  # 随机选择一个动作
```

观测空间(7 维)👀:
- 玩家的 y 坐标
- 玩家的速度
- 玩家到地面的距离
- 玩家到天花板的距离
- 下一方块与玩家在 x 方向上的距离
- 下一方块顶部的 y 位置
- 下一方块底部的 y 位置

动作空间(2 个动作)🎮:
- 向上(按下加速器)
- 什么都不做(不按加速器)

奖励函数 💰:
- 每通过一个垂直方块,它就获得 +1 的正奖励;每次到达终止状态,它都会收到 -1 的负奖励。

### 定义新的策略网络 🧠
- 由于环境更复杂,我们需要一个更深的神经网络

```python
class Policy(nn.Module):
    def __init__(self, s_size, a_size, h_size):
        super(Policy, self).__init__()
        # 在这里定义三个层

    def forward(self, x):
        # 在这里定义前向传播过程
        return F.softmax(x, dim=1)

    def act(self, state):
        state = torch.from_numpy(state).float().unsqueeze(0).to(device)
        probs = self.forward(state).cpu()
        m = Categorical(probs)
        action = m.sample()
        return action.item(), m.log_prob(action)
```

#### 解答

```python
class Policy(nn.Module):
    def __init__(self, s_size, a_size, h_size):
        super(Policy, self).__init__()
        self.fc1 = nn.Linear(s_size, h_size)
        self.fc2 = nn.Linear(h_size, h_size * 2)
        self.fc3 = nn.Linear(h_size * 2, a_size)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return F.softmax(x, dim=1)

    def act(self, state):
        state = torch.from_numpy(state).float().unsqueeze(0).to(device)
        probs = self.forward(state).cpu()
        m = Categorical(probs)
        action = m.sample()
        return action.item(), m.log_prob(action)
```

### 定义超参数 ⚙️
- 因为这个环境更复杂。
- 尤其是隐藏层大小,我们需要更多的神经元。

```python
pixelcopter_hyperparameters = {
    "h_size": 64,
    "n_training_episodes": 50000,
    "n_evaluation_episodes": 10,
    "max_t": 10000,
    "gamma": 0.99,
    "lr": 1e-4,
    "env_id": env_id,
    "state_space": s_size,
    "action_space": a_size,
}
```

### 训练模型
- 现在我们已经准备好训练智能体了 🔥。

```python
# 创建策略并放到设备上
# torch.manual_seed(50)
pixelcopter_policy = Policy(
    pixelcopter_hyperparameters["state_space"],
    pixelcopter_hyperparameters["action_space"],
    pixelcopter_hyperparameters["h_size"],
).to(device)
pixelcopter_optimizer = optim.Adam(pixelcopter_policy.parameters(), lr=pixelcopter_hyperparameters["lr"])
```

```python
scores = reinforce(
    pixelcopter_policy,
    pixelcopter_optimizer,
    pixelcopter_hyperparameters["n_training_episodes"],
    pixelcopter_hyperparameters["max_t"],
    pixelcopter_hyperparameters["gamma"],
    1000,
)
```

### 把训练好的模型发布到 Hub 🔥

```python
repo_id = ""  # TODO: 定义你的 repo id {username/Reinforce-{model-id}}
push_to_hub(
    repo_id,
    pixelcopter_policy,  # 我们想保存的模型
    pixelcopter_hyperparameters,  # 超参数
    eval_env,  # 评估环境
    video_fps=30
)
```

## 一些额外的挑战 🏆

最好的学习方式**就是自己动手尝试**!正如你所看到的,当前的智能体表现并不算好。第一个建议是训练更多步数,但也要尝试寻找更好的参数。

在[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)中你会看到你的智能体。你能冲到榜首吗?

下面是一些冲击排行榜的思路:
* 训练更多步数
* 参考其他学员的做法,尝试不同的超参数 👉 https://huggingface.co/models?other=reinforce
* 把你新训练的模型**推送**到 Hub 🔥
* **为更复杂的环境改进实现**(比如,把网络换成卷积神经网络(CNN)来处理以帧作为观测的情况,怎么样)?

________________________________________________________________________

**恭喜你完成了这个单元**!这一单元的信息量很大。
也恭喜你完成了本教程。你刚刚用 PyTorch 从零编写了你的第一个深度强化学习智能体,并把它分享到了 Hub 🥳。

欢迎继续迭代这个单元的内容,**为更复杂的环境改进实现**(比如,把网络换成卷积神经网络(CNN)来处理以帧作为观测的情况,怎么样)?

在下一个单元中,**我们将通过在 Unity 环境中训练智能体,进一步了解 Unity MLAgents**。这样,你就可以准备好参加 **AI 对战 AI 挑战赛:训练你的智能体在打雪仗和足球比赛中与其他智能体一较高下**。

听起来很有趣吧?下次见!

最后,我们非常想**听听你对这门课程的看法,以及我们可以如何改进它**。如果你有任何反馈,请 👉 [填写这份表单](https://forms.gle/BzKXWzLAGZESGNaE9)

第 5 单元见!🔥

### 持续学习,保持优秀 🤗
