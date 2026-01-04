# Temporal Protocol Screen

A high-fidelity luxury settings screen for managing notification schedules and wisdom delivery in "The Heritage" app.

## Features

### I. Morning Reflection
- **Brass-trimmed vertical time picker** for daily awakening time
- 24-hour format with hours and minutes selection
- Elegant gold-bordered display with British Racing Green text

### II. Scheduled Wisdom
- **Dual horizontal time pickers** for notification window
- "Commencement" and "Conclusion" time selection
- Smooth dropdown animations for time selection

### III. The Reservoir
- **Dual Seal Button selector** for wisdom source
- Choose between "The Archive" (Global) or "The Vault" (Liked Quotes)
- Visual selection with gold accents and color inversion

### IV. Frequency Meter
- **Semi-circular analog gauge** with interactive needle
- Select 1-10 daily notifications
- Pan gesture support for intuitive interaction
- Visual feedback with gold arc and oxblood needle

### V. Engagement Protocol
- **Toggle between notification modes**
- "Notification Text" vs "App Entry Required"
- Icon-based selection with full description

### VI. The Streak Saver
- **3D mechanical brass lever** with realistic rendering
- Heavy haptic feedback on toggle
- Visual engagement indicator
- "PROTECTED" vs "INACTIVE" status display

## Design System

### Colors
- **Primary**: British Racing Green (`#0f4c3a`)
- **Accent**: Champagne Gold (`#d4af37`)
- **Background**: Parchment/Cream (`#faf8f3`)
- **Highlight**: Oxblood (`#4a0e0e`)

### Typography
- **Headers**: Libre Baskerville Bold
- **Body**: Libre Caslon Text
- **Functional Text**: Libre Caslon Text

### Interactions
- All settings trigger distinct haptic feedback
- Smooth spring animations for state changes
- Paper-slide transitions for dropdown menus
- Heavy haptics for mechanical lever

## Usage

```typescript
import TemporalProtocolScreen from './components/TemporalProtocolScreen';

// In your app routing:
<Stack.Screen name="temporal" component={TemporalProtocolScreen} />
```

## Component Structure

```
TemporalProtocolScreen (Main)
├── MorningReflection
├── ScheduledWisdom
├── TheReservoir
├── FrequencyMeter
├── EngagementProtocol
└── TheStreakSaver
```

## State Management

The main screen manages all state and passes callbacks to child components:

- `morningTime`: Selected morning reflection time
- `commencementTime` / `conclusionTime`: Notification window
- `sourceMode`: 'archive' | 'vault'
- `frequency`: 1-10 daily notifications
- `engagementMode`: 'text' | 'app'
- `streakSaverActive`: boolean

## Haptic Feedback

- **Selection**: Light haptics for time/frequency changes
- **Impact Medium**: Mode toggles (Reservoir, Engagement)
- **Impact Heavy**: Mechanical lever (Streak Saver)
- **Success**: Apply Protocols button

## Accessibility

- All interactive elements have proper touch targets (min 48x48)
- Clear visual feedback for all states
- Descriptive labels for all settings
- Color contrast meets WCAG AA standards

## Future Enhancements

- [ ] Add time format preference (12h/24h)
- [ ] Implement actual scheduling logic
- [ ] Add preset schedules ("Morning Routine", "All Day", etc.)
- [ ] Connect to notification system
- [ ] Add sound selection for notifications
- [ ] Implement streak saver logic with backend

## Notes

- Requires `expo-haptics` for tactile feedback
- Uses `react-native-reanimated` for animations
- Uses `react-native-gesture-handler` for pan gestures
- All components are type-safe with TypeScript
