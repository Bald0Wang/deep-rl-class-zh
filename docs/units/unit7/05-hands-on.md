> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit7/hands-on.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit7/hands-on.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 动手实践

既然你已经学习了多智能体的基础知识,是时候在多智能体系统中训练你的第一批智能体了:**一支需要击败对手球队的 2v2 足球队**。

你还将参加 AI vs. AI 挑战赛:你训练的智能体将**每天与其他同学的智能体竞争,并登上一个全新的排行榜。**

要在认证流程中通过这个动手实践,你只需推送一个训练好的模型。**通过它没有任何最低成绩要求。**

有关认证流程的更多信息,请查看这一节 👉 [https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process](https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process)

本次动手实践会有所不同:要得到正确的结果,**你需要训练你的智能体 4 到 8 个小时**。考虑到 Colab 存在超时风险,我们建议你在自己的电脑上训练。你不需要超级计算机:一台普通笔记本就足以完成这个练习。

让我们开始吧! 🔥

## 什么是 AI vs. AI?

AI vs. AI 是我们在 Hugging Face 开发的一款开源工具,用于让 Hub 上的智能体在多智能体环境中相互竞争。这些模型随后会登上排行榜。

这个工具的理念是提供一个健壮的评估工具:**通过与许多其他智能体对抗来评估你的智能体,你就能很好地了解自己策略的质量。**

更准确地说,AI vs. AI 由三个工具组成:

- 一个*匹配(matchmaking)流程*,用于定义比赛(哪个模型对哪个模型),并利用 Space 中的后台任务运行模型对战。
- 一个*排行榜*,获取比赛历史结果并显示模型的 Elo 等级分:https://huggingface.co/spaces/huggingface-projects/AIvsAI-SoccerTwos
- 一个用于可视化你的智能体与其他智能体对局的 *Space demo*:https://huggingface.co/spaces/unity/ML-Agents-SoccerTwos

除了这三个工具之外,你的同学 cyllum 还创建了一个 🤗 SoccerTwos Challenge Analytics,你可以在其中查看模型的详细比赛结果:https://huggingface.co/spaces/cyllum/soccertwos-analytics

我们[写了一篇博文来详细介绍这个 AI vs. AI 工具](https://huggingface.co/blog/aivsai),先给你一个大致的概念,它的工作方式如下:

- 每隔四个小时,我们的算法会**获取给定环境(在我们的例子中是 ML-Agents-SoccerTwos)的所有可用模型。**
- 它用匹配算法**创建一个比赛队列。**
- 我们在 Unity 无头(headless)进程中模拟比赛,并**将比赛结果**(第一个模型获胜记 1,平局记 0.5,第二个模型获胜记 0)**收集到数据集中。**
- 然后,当比赛队列中的所有比赛都完成后,**我们更新每个模型的 Elo 分数并更新排行榜。**

### 比赛规则

这第一届 AI vs. AI 比赛**是一项实验**:目标是通过你的反馈在未来改进这个工具。因此挑战期间**可能会出现一些中断**。不过别担心,
**所有结果都保存在一个数据集中,因此我们随时可以正确地重新开始计算,而不会丢失信息**。

为了让你的模型能与其他模型正确地进行评估,你需要遵守以下规则:

1. **你不能更改智能体的观测空间或动作空间。**否则,你的模型在评估时将无法运行。
2. 你**目前不能使用自定义训练器**,需要使用 Unity MLAgents 自带的训练器。
3. 我们提供了用于训练智能体的可执行文件。如果你愿意,也可以使用 Unity Editor,**但为了避免 bug,我们建议你使用我们的可执行文件**。

在这次挑战中,真正起决定作用的将是**你选择的超参数**。

我们一直在努力改进教程,所以**如果你在这个 notebook 中发现了问题**,请[在 GitHub 仓库上开一个 issue](https://github.com/huggingface/deep-rl-class/issues)。

### 在 Discord 上与同学聊天、分享建议和提问

- 我们创建了一个名为 `ai-vs-ai-challenge` 的新频道,用于交流建议和提问。
- 如果你还没有加入 discord 服务器,可以[在这里加入](https://discord.gg/ydHrjt3WP5)。

## 步骤 0:安装 MLAgents 并下载正确的可执行文件

我们建议你使用 [conda](https://docs.conda.io/en/latest/) 作为包管理器,并创建一个新环境。

我们用 conda 创建一个名为 rl 的新环境,**Python 版本为 3.10.12**:

```bash
conda create --name rl python=3.10.12
conda activate rl
```

为了正确训练我们的智能体并推送到 Hub,我们需要安装 ML-Agents:

```bash
git clone https://github.com/Unity-Technologies/ml-agents
```

克隆完成(需要下载 2.63 GB)后,我们进入仓库并安装包:

```bash
cd ml-agents
pip install -e ./ml-agents-envs
pip install -e ./ml-agents
```

 Apple Silicon 的 Mac 用户在安装时可能会遇到问题(例如 ONNX wheel 构建失败),你应该先尝试安装 grpcio:
```bash
conda install grpcio
```
ml-agents 官方仓库中的[这个 GitHub issue](https://github.com/Unity-Technologies/ml-agents/issues/6019) 或许也能帮到你。

最后,你需要安装 git-lfs:https://git-lfs.com/

安装完成后,我们需要添加环境训练可执行文件。请根据你的操作系统下载其中一个,解压后放入 `ml-agents` 内一个名为 `training-envs-executables` 的新文件夹中。

最终,你的可执行文件应该位于 `ml-agents/training-envs-executables/SoccerTwos`。

Windows:下载[这个可执行文件](https://drive.google.com/file/d/1sqFxbEdTMubjVktnV4C6ICjp89wLhUcP/view?usp=sharing)

Linux (Ubuntu):下载[这个可执行文件](https://drive.google.com/file/d/1KuqBKYiXiIcU4kNMqEzhgypuFP5_45CL/view?usp=sharing)

Mac:下载[这个可执行文件](https://drive.google.com/drive/folders/1h7YB0qwjoxxghApQdEUQmk95ZwIDxrPG?usp=share_link)
⚠ 在 Mac 上,你还需要执行 `xattr -cr training-envs-executables/SoccerTwos/SoccerTwos.app`,才能运行 SoccerTwos

## 步骤 1:理解环境

这个环境叫做 `SoccerTwos`,由 Unity MLAgents Team 制作。你可以在[这里](https://github.com/Unity-Technologies/ml-agents/blob/develop/docs/Learning-Environment-Examples.md#soccer-twos)找到它的文档。

这个环境的目标**是把球送入对方球门,同时防止球进入自家球门。**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/soccertwos.gif" alt="SoccerTwos"/>

<figcaption>该环境由 <a href="https://github.com/Unity-Technologies/ml-agents"> Unity MLAgents Team</a> 制作</figcaption>

</figure>

### 奖励函数

奖励函数如下:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/soccerreward.png" alt="SoccerTwos Reward"/>

### 观测空间

观测空间由大小为 336 的向量组成:

- 11 条向前射线,分布在 120 度范围内(264 个状态维度)
- 3 条向后射线,分布在 90 度范围内(72 个状态维度)
- 这两类射线可以检测 6 种物体:
    - 球(Ball)
    - 蓝方球门(Blue Goal)
    - 紫方球门(Purple Goal)
    - 墙(Wall)
    - 蓝方智能体(Blue Agent)
    - 紫方智能体(Purple Agent)

### 动作空间

动作空间是三个离散分支:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/socceraction.png" alt="SoccerTwos Action"/>

## 步骤 2:理解 MA-POCA

我们已经知道如何训练智能体与他人对抗:**可以使用自博弈(self-play)**。对于 1v1 对局来说,这是完美的技术。

但我们的情况是 2v2,每队有 2 个智能体。那么我们如何**为一组智能体训练合作行为呢?**

正如 [Unity 博客](https://blog.unity.com/technology/ml-agents-v20-release-now-supports-training-complex-cooperative-behaviors)所解释的,当球队进球时,智能体通常会作为一组获得奖励(+1 - 罚分)。这意味着**球队中的每个智能体都会获得奖励,即使每个智能体对获胜的贡献并不相同**,这使得独立学习该做什么变得困难。

Unity MLAgents 团队在一个名为 *MA-POCA(Multi-Agent POsthumous Credit Assignment,多智能体事后信用分配)*的新多智能体训练器中开发了解决方案。

这个想法简单而强大:一个集中式 critic **处理队伍中所有智能体的状态,以估计每个智能体表现如何**。你可以把这个 critic 想象成一名教练。

这使得每个智能体可以**仅根据自己局部感知到的内容做决策**,同时**在整个群体的背景下评估自己行为的好坏**。


<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/mapoca.png" alt="MA POCA"/>

<figcaption>这展示了 MA-POCA 的集中式学习与去中心化执行。来源:<a href="https://blog.unity.com/technology/ml-agents-plays-dodgeball">MLAgents Plays Dodgeball</a>
</figcaption>

</figure>

解决方案就是将自博弈与 MA-POCA 训练器(称为 poca)结合使用。poca 训练器帮助我们训练合作行为,而自博弈帮助我们战胜对手球队。

如果你想深入了解 MA-POCA 算法,需要阅读他们发表的[论文](https://arxiv.org/pdf/2111.05992.pdf),以及我们在附加阅读部分提供的资料。

## 步骤 3:定义配置文件

我们已经在[第 5 单元](https://huggingface.co/deep-rl-course/unit5/introduction)中学到,在 ML-Agents 中,**训练超参数定义在 `config.yaml` 文件中。**

超参数有很多。要更好地理解它们,你应该阅读**[文档](https://github.com/Unity-Technologies/ml-agents/blob/release_20_docs/docs/Training-Configuration-File.md)**中对每个参数的解释。

我们这里要使用的配置文件位于 `./config/poca/SoccerTwos.yaml`。它看起来像这样:

```csharp
behaviors:
  SoccerTwos:
    trainer_type: poca
    hyperparameters:
      batch_size: 2048
      buffer_size: 20480
      learning_rate: 0.0003
      beta: 0.005
      epsilon: 0.2
      lambd: 0.95
      num_epoch: 3
      learning_rate_schedule: constant
    network_settings:
      normalize: false
      hidden_units: 512
      num_layers: 2
      vis_encode_type: simple
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    keep_checkpoints: 5
    max_steps: 5000000
    time_horizon: 1000
    summary_freq: 10000
    self_play:
      save_steps: 50000
      team_change: 200000
      swap_steps: 2000
      window: 10
      play_against_latest_model_ratio: 0.5
      initial_elo: 1200.0
```

与 Pyramids 或 SnowballTarget 相比,我们多了带自博弈部分的新超参数。如何修改这些参数,对能否取得好结果可能至关重要。

我在这里能给你的建议是:对照**[文档](https://github.com/Unity-Technologies/ml-agents/blob/release_20_docs/docs/Training-Configuration-File.md).**检查每个参数(尤其是自博弈相关参数)的解释和推荐值。

现在你已经修改好了配置文件,可以开始训练你的智能体了。

## 步骤 4:开始训练

要训练智能体,我们需要**启动 mlagents-learn,并选择包含环境的可执行文件。**

我们定义四个参数:

1. `mlagents-learn <config>`:超参数配置文件所在的路径。
2. `-env`:环境可执行文件所在的位置。
3. `-run_id`:你想给这次训练运行起的 id 名称。
4. `-no-graphics`:训练时不启动可视化界面。

根据你的硬件不同,500 万时间步(推荐值,你也可以尝试 1000 万)将需要 5 到 8 个小时的训练。在此期间你可以继续使用电脑,但我建议关闭电脑的待机模式,以免训练被中断。

根据你使用的可执行文件(windows、ubuntu、mac)不同,训练命令看起来会像下面这样(你的可执行文件路径可能不同,所以运行前不妨先检查一下)。

在 Windows 上,可能像这样:
```bash
mlagents-learn ./config/poca/SoccerTwos.yaml --env=./training-envs-executables/SoccerTwos.exe --run-id="SoccerTwos" --no-graphics
```

在 Mac 上,可能像这样:
```bash
mlagents-learn ./config/poca/SoccerTwos.yaml --env=./training-envs-executables/SoccerTwos/SoccerTwos.app --run-id="SoccerTwos" --no-graphics
```

该可执行文件包含 8 个 SoccerTwos 副本。

⚠️ 如果在 200 万时间步之前 ELO 分数没有大幅上升(甚至跌破 1200),这是正常的,因为你的智能体在能够进球之前,大部分时间都只是在场上随机移动。

⚠️ 你可以用 Ctrl + C 停止训练,但请注意这条命令只需输入一次来停止训练,因为 MLAgents 需要在结束运行之前生成最终的 .onnx 文件。

## 步骤 5:**将智能体推送到 Hugging Face Hub**

现在我们已经训练好了智能体,**可以准备把它们推送到 Hub,以便参加 AI vs. AI 挑战赛,并在浏览器中观看它们对局🔥。**

要与社区分享你的模型,还需要执行三个步骤:

1️⃣ (如果还没有的话)在 HF 创建一个账号 ➡ [https://huggingface.co/join](https://huggingface.co/join)

2️⃣ 登录并保存你在 Hugging Face 网站上的身份验证 token。

创建一个新 token(https://huggingface.co/settings/tokens),**角色为 write**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="Create HF Token">

复制该 token,运行以下命令,然后粘贴 token:

```bash
huggingface-cli login
```

然后,我们需要运行 `mlagents-push-to-hf`。

我们定义四个参数:

1. `-run-id`:训练运行 id 的名称。
2. `-local-dir`:智能体保存的位置,即 results/<run_id 名称>,在我的例子中就是 results/First Training。
3. `-repo-id`:你想创建或更新的 Hugging Face 仓库名称。它始终是 <你的 huggingface 用户名>/<仓库名>。
如果该仓库不存在,**它会被自动创建**
4. `--commit-message`:由于 HF 仓库是 git 仓库,你需要提供一条 commit 信息。

在我的例子中:

```bash
mlagents-push-to-hf  --run-id="SoccerTwos" --local-dir="./results/SoccerTwos" --repo-id="ThomasSimonini/poca-SoccerTwos" --commit-message="First Push"`
```

```bash
mlagents-push-to-hf  --run-id= # 填入你的 run id  --local-dir= # 你的本地目录  --repo-id= # 你的仓库 id --commit-message="First Push"
```

如果一切顺利,你应该会在流程结束时看到这些内容(不过 URL 会不同 😆):

你的模型已推送到 Hub。你可以在这里查看你的模型:https://huggingface.co/ThomasSimonini/poca-SoccerTwos

这是指向你的模型的链接。它包含一个说明如何使用模型的 model card、你的 Tensorboard 和你的配置文件。**很棒的是,它是一个 git 仓库,这意味着你可以拥有不同的 commit,可以通过新的推送更新你的仓库,等等。**

## 步骤 6:确认你的模型已为 AI vs AI 挑战赛做好准备

现在你的模型已推送到 Hub,**它将被自动加入 AI vs AI 挑战赛的模型池。**由于我们每 4 小时运行一轮比赛,你的模型登上排行榜可能需要一点时间。

但为确保一切正常,你需要检查:

1. 你的模型带有这个标签:ML-Agents-SoccerTwos。这是我们用来挑选加入挑战赛模型池的模型的标签。为此,请前往你的模型页面并查看标签

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/verify1.png" alt="Verify"/>


如果不是这样,你只需修改 readme 并添加该标签

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/verify2.png" alt="Verify"/>

2. 你有一个 `SoccerTwos.onnx` 文件

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/verify3.png" alt="Verify"/>

我们强烈建议:如果你想再次训练或训练一个新版本,推送时创建一个新模型。

## 步骤 7:在我们的 demo 中观看一些比赛

现在你的模型已经加入 AI vs AI 挑战赛,**你可以看看它与其他模型相比表现如何**:https://huggingface.co/spaces/unity/ML-Agents-SoccerTwos

为此,你只需进入这个 demo:

- 将你的模型选为蓝队(如果你愿意,也可以选为紫队),并选择另一个模型作为对手。用来对比的最佳对手,要么是排行榜榜首的模型,要么是[基线模型](https://huggingface.co/unity/MLAgents-SoccerTwos)

你现场看到的比赛不会用于计算你的成绩,**但它们是直观了解你的智能体实力的好方法**。

另外,别忘了在 discord 的 #rl-i-made-this 频道分享你的智能体取得的最佳成绩 🔥
