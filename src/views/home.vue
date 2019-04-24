<div style="padding: 14px;">
        <b>
          <a id="title" :href="url">
            <span>{{poolEvent.title}}</span>
          </a>
        </b>
        <div class="bottom clearfix">
          <time class="time">
            <i class="el-icon-time"></i>
            {{ getStartTime }}
          </time>
        </div>
        <div class="bottom clearfix">
          <date class="date">
            <i class="el-icon-date"></i>
            {{ getStartDate }}
          </date>
        </div>
        <div class="bottom clearfix">
          <span class="location">
            <i class="el-icon-location-outline"></i>
            {{address}}
          </span>
          <el-popover placement="top-start" width="400" trigger="click">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius earum delectus aut est. Illum animi, totam mollitia ab officiis commodi consequuntur at accusantium earum rerum unde laborum dolorum quaerat.
            </span>
          <el-button slot="reference">Click to activate</el-button>
        </el-popover>
        </div>
      </div>
      <el-col :span="4">
      <img v-if="poolEvent.type === 'festival'" :src="icons.festival" class="image">
      <img v-if="poolEvent.type === 'others'" :src="icons.others" class="image">
      <img v-if="poolEvent.type === 'concert'" :src="icons.concert" class="image">
      <img v-if="poolEvent.type === 'networkmeeting'" :src="icons.networkmeeting" class="image">
    </el-col>