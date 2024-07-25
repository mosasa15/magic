var roleRepairer = {  
    /**  
     * @param {Creep} creep  
     */  
    run: function(creep) {  
        sourceRoomName = creep.memory.sourceRoomName;
        targetRoomName = creep.memory.targetRoomName;
        if (creep.room.name !== sourceRoomName) {  
            creep.moveTo(new RoomPosition(25, 25, sourceRoomName), { visualizePathStyle: { stroke: '#ffaa00' } });  
            return; // 移动后直接返回，等待下一次tick继续执行  
        }  
        // 一旦到达位置，开始寻找并攻击目标  
        var invaderCores = creep.room.find(FIND_STRUCTURES, {    
            filter: (structure) => structure.structureType === STRUCTURE_INVADER_CORE    
        });    
        if (invaderCores.length > 0) {    
            const target = creep.pos.findClosestByPath(invaderCores);    
            if (creep.attack(target) === ERR_NOT_IN_RANGE) {    
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });    
            }    
        } else {    
            // 如果没有 INVADER CORE，则查找并攻击最近的敌对 creep    
            var hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);    
            if (hostileCreeps.length > 0) {    
                const target = creep.pos.findClosestByPath(hostileCreeps);    
                if (creep.attack(target) === ERR_NOT_IN_RANGE) {    
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });    
                }    
            }    
        }    
    }  
};  

module.exports = roleRepairer;