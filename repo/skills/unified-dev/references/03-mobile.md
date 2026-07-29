# Mobile & Desktop Reference

*Sources: gstack (QA/release roles), platform HIG guidelines, general best practices*

---

## Platform Philosophy

Each platform has a design language. Respect it — don't fight it.

| Platform | Design Language | Key Guideline |
|---|---|---|
| **iOS** | Human Interface Guidelines (HIG) | Native feel > custom widgets. Use system components where possible. |
| **Android** | Material Design 3 | Dynamic color, adaptive layouts, predictive back gesture |
| **macOS** | HIG for Mac | Menu bar, window chrome, keyboard shortcuts matter |
| **Windows** | Fluent Design | WinUI 3 / WinAppSDK for modern apps |
| **Cross-platform** | Flutter / React Native | Adapt per-platform, not one-size-fits-all |

---

## iOS / Swift / SwiftUI

### Architecture
- **MVVM** as default. `ObservableObject` / `@Observable` for state.
- Move business logic out of Views. Views should be dumb.
- Use `Combine` or `async/await` — not both in the same flow.
- `@MainActor` on ViewModels that update UI state.

### SwiftUI Rules
```swift
// Prefer:
struct ContentView: View {
    @State private var isLoading = false // local UI state
    @StateObject private var viewModel = ViewModel() // owned state
    @EnvironmentObject var auth: AuthManager // injected dependency
}

// Avoid:
// - Logic inside body
// - @ObservedObject for owned objects (use @StateObject)
// - Force unwrapping optionals
```

### HIG Compliance Checklist
- [ ] Tap targets ≥ 44×44pt
- [ ] Support Dynamic Type — use `.font(.body)` not fixed sizes
- [ ] Dark mode support — use semantic colors (`Color(.label)`, `.systemBackground`)
- [ ] Accessibility: `accessibilityLabel`, `accessibilityHint` on custom controls
- [ ] Support landscape if content makes sense at landscape
- [ ] Handle keyboard appearance (avoid content being hidden)
- [ ] Use SF Symbols — consistent with OS, scales with Dynamic Type

### Performance
- Profile with Instruments before shipping: Time Profiler, Allocations
- Avoid blocking the main thread — all network/disk on background actors
- `List` over `ScrollView + LazyVStack` for large data sets
- Image: use `AsyncImage` or cache with `NSCache`

---

## Android / Kotlin / Jetpack Compose

### Architecture
- **MVVM + UDF** (Unidirectional Data Flow) — ViewModel holds UI state as `StateFlow`
- `ViewModel` survives configuration changes — put business logic here
- Repository pattern for data layer
- Hilt for dependency injection

### Compose Rules
```kotlin
// Prefer:
@Composable
fun UserCard(user: User, onTap: () -> Unit) { // stateless, testable
    ...
}

// State hoisting pattern:
@Composable
fun Screen(viewModel: ScreenViewModel = hiltViewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    ScreenContent(state = state, onEvent = viewModel::onEvent)
}
```

### Material 3 Compliance
- [ ] Use `MaterialTheme` tokens — no hardcoded colors
- [ ] Support dynamic color (Android 12+): `dynamicLightColorScheme` / `dynamicDarkColorScheme`
- [ ] Predictive back gesture: `BackHandler` + `PredictiveBackGestureOverlay`
- [ ] Edge-to-edge: `WindowCompat.setDecorFitsSystemWindows(window, false)`
- [ ] Minimum touch target: 48×48dp
- [ ] Handle system font size and display size changes

### Performance
- Use `derivedStateOf` for computed values in Compose
- `LazyColumn`/`LazyRow` for lists — never `Column` in a ScrollView with many items
- Profile with Android Studio's Layout Inspector and CPU Profiler

---

## macOS

- macOS apps expect **menu bar** support — implement `Commands` in SwiftUI
- **Keyboard shortcuts** are expected by power users. Map common actions.
- Support **multiple windows** if the app is document-based
- Use `NSUserActivity` for state restoration
- **Sandboxing** required for App Store distribution
- Entitlements must match capabilities — common mistakes: network access, file access

---

## Cross-Platform (Flutter / React Native)

### Flutter
- `WidgetTree` should be shallow — extract widgets, don't nest 10 deep
- `const` constructors wherever possible — improves rebuild performance
- Platform-specific code via `Platform.isIOS` or `defaultTargetPlatform`
- Use `flutter analyze` and fix all warnings before shipping

### React Native
- Use `react-native-reanimated` for animations — JS thread animations drop frames
- `FlatList` with `keyExtractor` and `getItemLayout` for performance
- Use `react-native-mmkv` over `AsyncStorage` for sync reads
- New Architecture (Fabric + JSI) — enable if starting a new project

---

## App Store / Play Store Release Checklist

**iOS App Store:**
- [ ] Icons: 1024×1024 PNG, no alpha channel
- [ ] Screenshots: Required sizes for iPhone 6.9", 6.5", iPad Pro 13"
- [ ] Privacy manifest (`PrivacyInfo.xcprivacy`) — required since iOS 17
- [ ] App Review Guidelines: no placeholder content, all features functional
- [ ] TestFlight: at least 1 week of beta testing before release

**Google Play:**
- [ ] Feature graphic: 1024×500 JPEG/PNG
- [ ] Screenshots: min 2 per form factor
- [ ] `targetSdkVersion` ≤ 1 year behind current (currently 35)
- [ ] 64-bit support required
- [ ] Data Safety section filled out accurately
