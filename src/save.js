/**
 * Module quản lý lưu trữ (Save & Settings Manager)
 * Bọc try/catch toàn bộ thao tác localStorage để không lỗi khi chạy ở file:// hoặc chế độ chặn cookie.
 */

import { GAME_CONFIG } from './config.js';

export class SaveManager {
  constructor() {
    this.memoryFallback = {};
    this.storageAvailable = this._checkStorage();
    this.settings = this.loadSettings();
    this.saveData = this.loadSaveData();
  }

  _checkStorage() {
    try {
      const testKey = '__tram9_storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (_err) {
      return false;
    }
  }

  _getRaw(key) {
    try {
      if (this.storageAvailable && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (_err) {
      this.storageAvailable = false;
    }
    return Object.prototype.hasOwnProperty.call(this.memoryFallback, key)
      ? this.memoryFallback[key]
      : null;
  }

  _setRaw(key, value) {
    this.memoryFallback[key] = value;
    try {
      if (this.storageAvailable && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (_err) {
      this.storageAvailable = false;
    }
  }

  loadSettings() {
    const defaults = { ...GAME_CONFIG.defaultSettings };
    const raw = this._getRaw(GAME_CONFIG.settingsKey);
    if (!raw) return defaults;
    try {
      const parsed = JSON.parse(raw);
      return {
        quality: ['low', 'medium', 'high'].includes(parsed.quality) ? parsed.quality : defaults.quality,
        fov: Number.isFinite(parsed.fov) ? Math.min(100, Math.max(55, parsed.fov)) : defaults.fov,
        sensitivity: Number.isFinite(parsed.sensitivity) ? Math.min(3.0, Math.max(0.2, parsed.sensitivity)) : defaults.sensitivity,
        invertY: Boolean(parsed.invertY),
        headBob: parsed.headBob !== undefined ? Boolean(parsed.headBob) : defaults.headBob,
        reduceFlashing: Boolean(parsed.reduceFlashing),
        subtitleSize: ['small', 'medium', 'large'].includes(parsed.subtitleSize) ? parsed.subtitleSize : defaults.subtitleSize,
        bgmVolume: Number.isFinite(parsed.bgmVolume) ? Math.min(1, Math.max(0, parsed.bgmVolume)) : defaults.bgmVolume,
        sfxVolume: Number.isFinite(parsed.sfxVolume) ? Math.min(1, Math.max(0, parsed.sfxVolume)) : defaults.sfxVolume,
        voiceVolume: Number.isFinite(parsed.voiceVolume) ? Math.min(1, Math.max(0, parsed.voiceVolume)) : defaults.voiceVolume,
        language: ['vi', 'en'].includes(parsed.language) ? parsed.language : defaults.language
      };
    } catch (_err) {
      return defaults;
    }
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this._setRaw(GAME_CONFIG.settingsKey, JSON.stringify(this.settings));
    return this.settings;
  }

  loadSaveData() {
    const emptySave = {
      hasCheckpoint: false,
      checkpointHour: 1,
      collectedNotes: [],
      unlockedEndings: [],
      flags: {
        obeyedBookCount: 0,
        trueReportCount: 0,
        routineBrokenCount: 0,
        assimilationScore: 0,
        heard1084Mhz: false,
        generatorKeptSafe: false,
        notebookBurned: false,
        lastStepCount: 0,
        favoriteFirstStation: 'Áp kế',
        longestDwellZone: 'Phòng Radio',
        stationOrdersHistory: []
      }
    };

    const raw = this._getRaw(GAME_CONFIG.storageKey);
    if (!raw) return emptySave;
    try {
      const parsed = JSON.parse(raw);
      return {
        hasCheckpoint: Boolean(parsed.hasCheckpoint),
        checkpointHour: Number.isInteger(parsed.checkpointHour) ? Math.min(6, Math.max(1, parsed.checkpointHour)) : 1,
        collectedNotes: Array.isArray(parsed.collectedNotes) ? parsed.collectedNotes : [],
        unlockedEndings: Array.isArray(parsed.unlockedEndings) ? parsed.unlockedEndings : [],
        flags: {
          ...emptySave.flags,
          ...(parsed.flags || {})
        }
      };
    } catch (_err) {
      return emptySave;
    }
  }

  saveCheckpoint(hour, collectedNotesArray, flagsObj) {
    this.saveData.hasCheckpoint = true;
    this.saveData.checkpointHour = Math.min(6, Math.max(1, hour));
    this.saveData.collectedNotes = Array.from(new Set(collectedNotesArray));
    this.saveData.flags = {
      ...this.saveData.flags,
      ...flagsObj
    };
    this._setRaw(GAME_CONFIG.storageKey, JSON.stringify(this.saveData));
  }

  recordEndingUnlocked(endingId) {
    if (!this.saveData.unlockedEndings.includes(endingId)) {
      this.saveData.unlockedEndings.push(endingId);
    }
    this._setRaw(GAME_CONFIG.storageKey, JSON.stringify(this.saveData));
  }

  resetRunSaveKeepEndings() {
    const unlocked = [...this.saveData.unlockedEndings];
    this.saveData = {
      hasCheckpoint: true,
      checkpointHour: 1,
      collectedNotes: [],
      unlockedEndings: unlocked,
      flags: {
        obeyedBookCount: 0,
        trueReportCount: 0,
        routineBrokenCount: 0,
        assimilationScore: 0,
        heard1084Mhz: false,
        generatorKeptSafe: false,
        notebookBurned: false,
        lastStepCount: 0,
        favoriteFirstStation: 'Áp kế',
        longestDwellZone: 'Phòng Radio',
        stationOrdersHistory: []
      }
    };
    this._setRaw(GAME_CONFIG.storageKey, JSON.stringify(this.saveData));
    return this.saveData;
  }
}
