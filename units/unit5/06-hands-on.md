> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit5/hands-on.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit5/hands-on.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 实战练习

<CourseFloatingBanner classNames="absolute z-10 right-0 top-0"
notebooks={[
  {label: "Google Colab", value: "https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/notebooks/unit5/unit5.ipynb"}
  ]}
  askForHelpUrl="http://hf.co/join/discord" />


我们已经了解了 ML-Agents 是什么以及它如何工作，也学习了我们将要使用的两个环境。现在，我们准备好训练智能体了！

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/envs.png" alt="环境" />

要在认证流程中通过本次实战练习，你**只需要把训练好的模型推送到 Hub。**
通过本次实战练习**没有最低成绩要求**。不过如果你想拿到漂亮的结果，可以尝试达到以下水平：

- 对于 [Pyramids](https://huggingface.co/spaces/unity/ML-Agents-Pyramids)：平均奖励 = 1.75
- 对于 [SnowballTarget](https://huggingface.co/spaces/ThomasSimonini/ML-Agents-SnowballTarget)：平均奖励 = 15，或者说一局中射中 30 个目标。

想了解认证流程的更多信息，请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

**要开始实战练习，请点击 Open In Colab 按钮** 👇：

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/unit5/unit5.ipynb)

我们**强烈建议学生在实战练习中使用 Google Colab**，而不是在自己的个人电脑上运行。

使用 Google Colab，**你可以专注于学习和实验，而不必为搭建环境的技术细节操心**。

# 第 5 单元：ML-Agents 入门

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/thumbnail.png" alt="缩略图"/>

在这个 notebook 中，你将了解 ML-Agents 并训练两个智能体。

- 第一个智能体将学会**朝不断生成的目标投掷雪球**。
- 第二个智能体需要按下一个按钮来生成金字塔，然后导航到金字塔、把它推倒，**并移动到金字塔顶端的金砖处**。要做到这一点，它需要探索自己的环境，我们将使用一种名为好奇心（curiosity）的技术。

完成之后，你将可以**直接在浏览器中观看你的智能体游玩**。

想了解认证流程的更多信息，请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

⬇️ 下面展示了**你在本单元结束时将实现的效果**示例。⬇️

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids.gif" alt="Pyramids"/>

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballtarget.gif" alt="SnowballTarget"/>

### 🎮 环境：

- [Pyramids](https://github.com/Unity-Technologies/ml-agents/blob/main/docs/Learning-Environment-Examples.md#pyramids)
- SnowballTarget

### 📚 RL 库：

- [ML-Agents](https://github.com/Unity-Technologies/ml-agents)

我们一直在努力改进教程，因此**如果你在这个 notebook 中发现了问题**，请[在 GitHub 仓库上提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

## 本 notebook 的目标 🏆

学完本 notebook 后，你将：

- 理解 **ML-Agents** 及其环境库的工作原理。
- 能够**在 Unity 环境中训练智能体**。

## 先决条件 🏗️
在深入学习本 notebook 之前，你需要：

🔲 📚 **通过阅读第 5 单元学习 [ML-Agents 是什么以及它如何工作](https://huggingface.co/deep-rl-course/unit5/introduction)**  🤗

# 让我们来训练智能体 🚀

## 设置 GPU 💪

- 为了**加速智能体的训练，我们将使用 GPU**。为此，请前往 `Runtime > Change Runtime type`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step1.jpg" alt="GPU 第 1 步">

- `Hardware Accelerator > GPU`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step2.jpg" alt="GPU 第 2 步">

## 克隆仓库 🔽

- 我们需要克隆包含 **ML-Agents** 的仓库。

```bash
# 克隆仓库（可能需要 3 分钟）
git clone --depth 1 https://github.com/Unity-Technologies/ml-agents
```

## 设置虚拟环境 🔽

- 为了让 **ML-Agents** 能够在 Colab 中成功运行，Colab 的 Python 版本必须满足该库对 Python 的要求。

- 我们可以在 `setup.py` 文件中的 `python_requires` 参数下查看所支持的 Python 版本。这些文件是安装使用 **ML-Agents** 库所必需的，位于以下位置：
  - `/content/ml-agents/ml-agents/setup.py`
  - `/content/ml-agents/ml-agents-envs/setup.py`

- Colab 当前的 Python 版本（可以用 `!python --version` 查看）与该库的 `python_requires` 参数不匹配，因此安装可能会静默失败，并在之后执行相同命令时导致如下错误：
  - `/bin/bash: line 1: mlagents-learn: command not found`
  - `/bin/bash: line 1: mlagents-push-to-hf: command not found`

- 为了解决这个问题，我们将创建一个 Python 版本与 **ML-Agents** 库兼容的虚拟环境。

`注意：`*为了将来的兼容性，请务必检查安装文件中的 `python_requires` 参数；如果 Colab 的 Python 版本不兼容，请在下面的脚本中把虚拟环境设置为所支持的最高 Python 版本*

```bash
# Colab 当前的 Python 版本（与 ML-Agents 不兼容）
!python --version
```

```bash
# 安装 virtualenv 并创建虚拟环境
!pip install virtualenv
!virtualenv myenv

# 下载并安装 Miniconda
!wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
!chmod +x Miniconda3-latest-Linux-x86_64.sh
!./Miniconda3-latest-Linux-x86_64.sh -b -f -p /usr/local

# 激活 Miniconda 并安装 Python 3.10.12 版
!source /usr/local/bin/activate
!conda install -q -y --prefix /usr/local python=3.10.12 ujson  # 在这里指定版本

# 为 Python 和 conda 路径设置环境变量
!export PYTHONPATH=/usr/local/lib/python3.10/site-packages/
!export CONDA_PREFIX=/usr/local/envs/myenv
```

```bash
# 新虚拟环境中的 Python 版本（与 ML-Agents 兼容）
!python --version
```

## 安装依赖 🔽

```bash
# 进入仓库并安装软件包（可能需要 3 分钟）
%cd ml-agents
pip3 install -e ./ml-agents-envs
pip3 install -e ./ml-agents
```

## SnowballTarget ⛄

如果你需要回顾这个环境的工作方式，请查看这一节 👉
https://huggingface.co/deep-rl-course/unit5/snowball-target

### 下载环境 zip 文件并移动到 `./training-envs-executables/linux/`

- 我们的环境可执行文件在一个 zip 文件里。
- 我们需要下载它，并将其放到 `./training-envs-executables/linux/`
- 我们使用 Linux 可执行文件，是因为我们使用 Colab，而 Colab 机器的操作系统是 Ubuntu（Linux）

```bash
# 这里，我们创建 training-envs-executables 和 linux 目录
mkdir ./training-envs-executables
mkdir ./training-envs-executables/linux
```

我们使用 `wget` 从 https://github.com/huggingface/Snowball-Target 下载了 SnowballTarget.zip 文件

```bash
wget "https://github.com/huggingface/Snowball-Target/raw/main/SnowballTarget.zip" -O ./training-envs-executables/linux/SnowballTarget.zip
```

我们解压这个可执行文件的 zip 包

```bash
unzip -d ./training-envs-executables/linux/ ./training-envs-executables/linux/SnowballTarget.zip
```

确保你的文件可以访问

```bash
chmod -R 755 ./training-envs-executables/linux/SnowballTarget
```

### 定义 SnowballTarget 配置文件
- 在 ML-Agents 中，你需要**在 config.yaml 文件中定义训练超参数**。

超参数有很多。为了更好地理解它们，你应该阅读[文档](https://github.com/Unity-Technologies/ml-agents/blob/release_20_docs/docs/Training-Configuration-File.md)中对每个超参数的解释。


你需要在 ./content/ml-agents/config/ppo/ 目录下创建一个 `SnowballTarget.yaml` 配置文件。

我们会给出这个配置的一个初步版本（复制粘贴到你的 `SnowballTarget.yaml` 文件中即可），**但你应该对它进行修改**。

```yaml
behaviors:
  SnowballTarget:
    trainer_type: ppo
    summary_freq: 10000
    keep_checkpoints: 10
    checkpoint_interval: 50000
    max_steps: 200000
    time_horizon: 64
    threaded: true
    hyperparameters:
      learning_rate: 0.0003
      learning_rate_schedule: linear
      batch_size: 128
      buffer_size: 2048
      beta: 0.005
      epsilon: 0.2
      lambd: 0.95
      num_epoch: 3
    network_settings:
      normalize: false
      hidden_units: 256
      num_layers: 2
      vis_encode_type: simple
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
```

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballfight_config1.png" alt="SnowballTarget 配置"/>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballfight_config2.png" alt="SnowballTarget 配置"/>

作为实验，你可以尝试修改其他一些超参数。Unity 在[这里提供了非常好的文档](https://github.com/Unity-Technologies/ml-agents/blob/main/docs/Training-Configuration-File.md)逐一解释了每个超参数。

既然你已经创建了配置文件，也理解了大多数超参数的作用，我们就可以开始训练智能体了 🔥。

### 训练智能体

要训练我们的智能体，我们需要**启动 mlagents-learn 并选择包含环境的可执行文件**。

我们定义四个参数：

1. `mlagents-learn <config>`：超参数配置文件所在的路径。
2. `--env`：环境可执行文件所在的位置。
3. `--run-id`：你想给本次训练运行 id 起的名字。
4. `--no-graphics`：训练过程中不启动可视化界面。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/mlagentslearn.png" alt="mlagents-learn"/>

训练模型，并使用 `--resume` 标志在训练中断后继续训练。

> 第一次使用 `--resume` 时会失败。重新运行该单元格即可绕过这个错误。

训练大约需要 10 到 35 分钟，具体取决于你的配置。去喝杯 ☕️ 吧，这是你应得的 🤗。

```bash
mlagents-learn ./config/ppo/SnowballTarget.yaml --env=./training-envs-executables/linux/SnowballTarget/SnowballTarget --run-id="SnowballTarget1" --no-graphics
```

### 把智能体推送到 Hugging Face Hub

- 现在我们已经训练好了智能体，**可以把它推送到 Hub，并在你的浏览器中观看它游玩🔥。**

要与社区分享你的模型，还需要完成以下三个步骤：

1️⃣（如果还没有的话）注册一个 HF 账号 ➡ https://huggingface.co/join

2️⃣ 登录并保存你在 Hugging Face 网站上的认证令牌（token）。
- 创建一个新令牌（https://huggingface.co/settings/tokens），**角色为 write（写入）**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="创建 HF 令牌">

- 复制该令牌
- 运行下面的单元格并粘贴令牌

```python
from huggingface_hub import notebook_login

notebook_login()
```

如果你不想使用 Google Colab 或 Jupyter Notebook，则需要改用这条命令：`huggingface-cli login`

然后我们需要运行 `mlagents-push-to-hf`。

我们定义四个参数：

1. `--run-id`：训练运行 id 的名称。
2. `--local-dir`：智能体保存的位置，即 results/<run_id 名称>，以我为例就是 results/First Training。
3. `--repo-id`：你想创建或更新的 Hugging Face 仓库名称。它始终是 <你的 Hugging Face 用户名>/<仓库名>
如果该仓库不存在，**它将被自动创建**
4. `--commit-message`：由于 HF 仓库是 git 仓库，你需要提供一条提交信息。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/mlagentspushtohub.png" alt="推送到 Hub"/>

例如：

`mlagents-push-to-hf  --run-id="SnowballTarget1" --local-dir="./results/SnowballTarget1" --repo-id="ThomasSimonini/ppo-SnowballTarget"  --commit-message="First Push"`

```python
mlagents-push-to-hf  --run-id= # 填入你的 run id  --local-dir= # 你的本地目录  --repo-id= # 你的仓库 id  --commit-message= # 你的提交信息
```

如果一切顺利，你应该会在流程结束时看到如下内容（只是 URL 不同 😆）：



```
Your model is pushed to the hub. You can view your model here: https://huggingface.co/ThomasSimonini/ppo-SnowballTarget
```

这是你的模型的链接。其中包含一个说明如何使用它的模型卡（model card）、你的 Tensorboard 和你的配置文件。**最棒的是，它是一个 git 仓库，这意味着你可以拥有不同的提交，可以通过新的推送更新你的仓库，等等。**

但接下来才是最好的部分：**能够在线观看你的智能体游玩 👀。**

### 观看你的智能体游玩 👀

这一步很简单：

1. 前往这里：https://huggingface.co/spaces/ThomasSimonini/ML-Agents-SnowballTarget

2. 启动游戏，点击右下角的按钮使其全屏

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/snowballtarget_load.png" alt="SnowballTarget 加载"/>

1. 在第 1 步中，输入你的用户名（用户名区分大小写：例如，我的用户名是 ThomasSimonini，而不是 thomassimonini 或 ThOmasImoNInI），然后点击搜索按钮。

2. 在第 2 步中，选择你的模型仓库。

3. 在第 3 步中，**选择你想要回放哪个模型**：
  - 我有多个模型，因为我们每 500000 个时间步（timestep）就保存一个模型。
  - 不过因为我想要最新的那个，所以我选择 `SnowballTarget.onnx`

👉 建议**尝试用不同训练步数保存的模型，观察智能体的进步。**


欢迎在 Discord 的 #rl-i-made-this 频道分享你的智能体取得的最高分 🔥

现在，让我们来尝试一个更具挑战性的环境，叫做 Pyramids。

## Pyramids 🏆

### 下载环境 zip 文件并移动到 `./training-envs-executables/linux/`
- 我们的环境可执行文件在一个 zip 文件里。
- 我们需要下载它，并将其放入 `./training-envs-executables/linux/`
- 我们使用 Linux 可执行文件，是因为我们使用的是 Colab，而 Colab 机器的操作系统是 Ubuntu（Linux）

我们使用 `wget` 从 https://huggingface.co/spaces/unity/ML-Agents-Pyramids/resolve/main/Pyramids.zip 下载了 Pyramids.zip 文件

```python
wget "https://huggingface.co/spaces/unity/ML-Agents-Pyramids/resolve/main/Pyramids.zip" -O ./training-envs-executables/linux/Pyramids.zip
```

解压它

```python
unzip -d ./training-envs-executables/linux/ ./training-envs-executables/linux/Pyramids.zip
```

确保你的文件可以访问

```bash
chmod -R 755 ./training-envs-executables/linux/Pyramids/Pyramids
```

### 修改 PyramidsRND 配置文件
  
- 与第一个自定义环境不同，**Pyramids 是由 Unity 团队制作的**。
- 因此 PyramidsRND 配置文件已经存在，位于 ./content/ml-agents/config/ppo/PyramidsRND.yaml
- 你可能会问，PyramidsRND 里的 "RND" 是什么意思。RND 是*随机网络蒸馏*（random network distillation）的缩写，它是一种生成好奇心奖励的方法。如果你想了解更多，我们写了一篇文章解释这一技术：https://medium.com/data-from-the-trenches/curiosity-driven-learning-through-random-network-distillation-488ffd8e5938

对于这次训练，我们只修改一处：
- 总训练步数这个超参数设置得过高，因为我们只需 1M（一百万）个训练步就能达到基准（平均奖励 = 1.75）。
👉 为此，我们打开 config/ppo/PyramidsRND.yaml，**把 max_steps 改为 1000000。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit7/pyramids-config.png" alt="Pyramids 配置"/>

作为实验，你也应该尝试修改其他一些超参数。Unity 在[这里提供了非常好的文档](https://github.com/Unity-Technologies/ml-agents/blob/main/docs/Training-Configuration-File.md)逐一解释了每个超参数。

我们现在可以开始训练智能体了 🔥。

### 训练智能体

训练大约需要 30 到 45 分钟，具体取决于你的机器。去喝杯 ☕️ 吧，这是你应得的 🤗。

```python
mlagents-learn ./config/ppo/PyramidsRND.yaml --env=./training-envs-executables/linux/Pyramids/Pyramids --run-id="Pyramids Training" --no-graphics
```

### 把智能体推送到 Hugging Face Hub

- 现在我们已经训练好了智能体，**可以把它推送到 Hub，以便在你的浏览器中观看它游玩🔥。**

```python
mlagents-push-to-hf  --run-id= # 填入你的 run id  --local-dir= # 你的本地目录  --repo-id= # 你的仓库 id  --commit-message= # 你的提交信息
```

### 观看你的智能体游玩 👀

👉 https://huggingface.co/spaces/unity/ML-Agents-Pyramids
  
### 🎁 附加内容：为什么不在另一个环境上训练呢？
  
既然你已经知道如何使用 MLAgents 训练智能体了，**为什么不试试别的环境呢？**

MLAgents 提供了 17 个不同的环境，我们还在构建一些自定义环境。最好的学习方式就是自己动手尝试，祝你好玩。

![封面](https://miro.medium.com/max/1400/0*xERdThTRRM2k_U9f.png)

目前在 Hugging Face 上可用环境的完整列表在这里 👉 https://github.com/huggingface/ml-agents#the-environments

观看你智能体演示的页面在这里 👉 https://huggingface.co/unity

目前我们已经集成了：
- [Worm](https://huggingface.co/spaces/unity/ML-Agents-Worm) 演示，教一条**虫子爬行**。
- [Walker](https://huggingface.co/spaces/unity/ML-Agents-Walker) 演示，教智能体**朝目标行走**。

今天的内容就到这里。恭喜你完成了本教程！

学习的最好方式就是动手练习、多做尝试。为什么不试试另一个环境呢？ML-Agents 有 18 个不同的环境，你也可以创建自己的环境。查阅文档，尽情享受吧！

第 6 单元见 🔥，

## 持续学习，保持优秀 🤗
