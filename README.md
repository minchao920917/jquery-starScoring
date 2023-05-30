
## jquery 星星评级插件

老项目焕发容光，为了应对苛刻的产品需求，要求在 C#的 web 项目中使用星星评级插件，且要求评级到小数点后一位

不说了直接上图

![效果图](./img/%E7%A4%BA%E4%BE%8B.png)

### 参数及方法解释配置

| 参数/方法 | 功能         | 初始值      |
| --------- | ------------ | ----------- |
| mode      | 评星模式     | LightEntire |
| num       | 点亮初始值   | 0           |
| readOnly  | 是否只读     | fasle       |
| select    | 鼠标轻扫方法 | -           |
| chosen    | 鼠标点击确定 | -           |

### 使用示例

// 引入 jquery 引入组件

    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="./jquery-starScoring.js"></script>

// html 使用

    <ul class="scoring">
        <!-- i.scoring-item[title]*5 -->
        <li class="scoring-item"></li>
        <li class="scoring-item"></li>
        <li class="scoring-item"></li>
        <li class="scoring-item"></li>
        <li class="scoring-item"></li>
    </ul>

     <div>
        打分结果: <span id="p"></span>
    </div>

// css 样式

    * {
        margin: 0px;
        padding: 0px;
    }

    li {
        list-style: none;
    }

    .scoring {
        width: 180px;
        height: 25px;
        margin: 20px auto;
        overflow-x: 0;
    }
    .scoring .scoring-item{
        height: 25px;
        width: 25px;
        margin:0 5px;
        background: url(./img/star.png) no-repeat;
        /* background-position: 0 -50px; */
        cursor: pointer;
        float: left;
    }
    div{
        text-align: center;
    }

// 初始化插件

     starScoring.init('.scoring', {
            mode: 'LightEntire', //  LightEntire/LightHalf/LightTen
            num: 2, //点亮初始值
        });
        $('.scoring').on('select', function(e, num, total) {
            $('#p').html(num)
        }).on('chosen', function(e, num, total) {
            $('#p').html(num)
        })

解释说明：其中 mode 有三种模式可供选择，分别是：

    LightEntire 整颗星点亮
    LightHalf   半颗星点亮
    LightTen    十分之一颗星点亮
    LightTwenty    十分制 配合 Math.round(num*2 * 10) / 10 使用

## 结束语

最后附上 img 的背景图，以及源 psd

对您有用的话，记得给个 star 点个赞
