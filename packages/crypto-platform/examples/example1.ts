import {PlatformUtils} from '../src/platform-utils/platform-utils'


const platformUtils = new PlatformUtils();

platformUtils.getPriceDiff().subscribe((res) => {
  console.log(res);
});

