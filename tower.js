var Tower = {  
    // 添加一个白名单数组  
    whitelist: ['ZaindORp','zanggq'], // 示例用户名  
    /**  
     * @param {StructureTower} tower - 当前的塔对象  
     */  
    run: function(tower) {  
        // 检查是否有敌对单位需要攻击  
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);  
        if (target) {  
            // 检查目标是否在白名单中  
            if (!this.whitelist.includes(target.owner.username)) {  
                tower.attack(target);  
            }  
        } else {  
            // 如果没有敌对单位，则检查并维修受损建筑  
            var repairTargets = tower.room.find(FIND_STRUCTURES, {  
                filter: (structure) => {  
                    return (structure.hits < structure.hitsMax * 0.6) &&  
                        (structure.structureType === STRUCTURE_CONTAINER ||   
                        structure.structureType === STRUCTURE_ROAD ||   
                        structure.structureType === STRUCTURE_TOWER) && // 添加其他可修复的结构类型  
                        structure.structureType !== STRUCTURE_CONTROLLER; // 不修复控制器  
                }  
            });  
            // 如果没有指定排序或按类型排序后，选择第一个目标进行修复  
            if (repairTargets.length > 0) {  
                tower.repair(repairTargets[0]);  
            }  
        }  
    }  
};  
  
module.exports = Tower;