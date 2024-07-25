var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransferer = require('role.transferer');
var roleRepairer = require('role.repairer');
var SpawnFunction = require('Spawn');
var NewSpawnFunction = require('NewSpawn');
var roleAttacker = require('role.attacker');
var roleclaimer = require('role.claimer')
var roleNewHarvester = require('role.NewHarvester');
var roleNewtransferer = require('role.Newtransferer');
var roleScavenger = require('role.scavenger');
var roleAdventurer = require('role.adventurer');
var rolereserveController = require('role.reserveController');
var roleCentraltransferer = require('role.Centraltransferer');
var Tower = require('tower');
var Link = require('Link');
var roleManager = require('role.manager');
var roleNewbuilder = require('role.Newbuilder');
const market = require('market');  
require('超级移动优化hotfix 0.9.4');
require('极致建筑缓存 v1.4.3');


module.exports.loop = function () {
    for(var name in Memory.creeps) { // 释放内存
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            continue;
        }
    }


    //market.createBuyOrderForEnergy();

    if (Game.cpu.bucket === 10000) {//如果CPU到了一万点，则换成pixel
        Game.cpu.generatePixel();
        console.log(`兑换成功`);
    }
    


    var spawn1 = Game.spawns['Spawn1'];
    SpawnFunction.run(spawn1);


    var spawn2 = Game.spawns['E56N13'];
    NewSpawnFunction.run(spawn2);


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'transferer') {
            roleTransferer.run(creep);
        }
        else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if(creep.memory.role == 'NewHarvester') {
            roleNewHarvester.run(creep);
        }
        else if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        else if(creep.memory.role == 'manager') {
            roleManager.run(creep);
        }
        else if(creep.memory.role == 'Newtransferer') {
            roleNewtransferer.run(creep);
        }
        else if(creep.memory.role == 'Newbuilder') {
            roleNewbuilder.run(creep);
        }
        else if(creep.memory.role == 'scavenger') {
            roleScavenger.run(creep);
        }
        else if(creep.memory.role == 'claimer') {
            roleclaimer.run(creep);
        }
        else if(creep.memory.role == 'reserveController') {
            rolereserveController.run(creep);
        }
        else if(creep.memory.role == 'Centraltransferer') {
            roleCentraltransferer.run(creep);
        }
        else if(creep.memory.role == 'adventurer') {
            roleAdventurer.run(creep);
        }
    }
    var towerList = creep.room.tower;
    for(var tower of towerList){
        Tower.run(tower);
    }
    var Links = creep.room.link;
    for(var link of Links){
        Link.run(link);
    }
    // Memory.rooms.E54N19.centerLinkId = Links[3].id;
    // Memory.rooms.E54N19.upgradeLinkId = Links[2].id;
}