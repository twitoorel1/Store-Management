Private Sub Worksheet_Change(ByVal Target As Range)
    Dim selectedType As String
    Dim selectedSize As String
    Dim sizesTable As ListObject
    
    ' Assuming Type is in column B and Size is in column D in the worksheet "עובדים"
    If Target.Column = 2 And Target.Row > 1 Then
        selectedType = Target.Value
        
        ' Check if selectedType matches any of the defined types
        If selectedType = "קונטיינר" Or selectedType = "עגלה" Or selectedType = "פאלט" Then
            ' Assuming the sizes table is named "TableObjectsList" in the "הגדרות" sheet
            Set sizesTable = Sheets("הגדרות").ListObjects("TableObjectsList")
            
            ' Get the correct column index based on the selected type
            Dim colIndex As Long
            Select Case selectedType
                Case "קונטיינר": colIndex = 2 ' Assuming "קונטיינר" column index
                Case "עגלה": colIndex = 3 ' Assuming "עגלה" column index
                Case "פאלט": colIndex = 4 ' Assuming "פאלט" column index
            End Select
            
            ' Display a dropdown list with the sizes based on the selected type
            With Target.Offset(0, 2) ' Assuming Size is in column D
                .Validation.Delete
                .Validation.Add Type:=xlValidateList, _
                AlertStyle:=xlValidAlertStop, Operator:= _
                xlBetween, Formula1:=GetSizesForType(sizesTable, colIndex)
                .IgnoreBlank = True
                .InCellDropdown = True
                .ShowInput = True
                .ShowError = True
            End With
        End If
    End If
End Sub

Function GetSizesForType(sizesTable As ListObject, colIndex As Long) As String
    Dim sizes As String
    Dim row As ListRow
    
    sizes = ""
    For Each row In sizesTable.ListRows
        If Not IsEmpty(row.Range.Cells(1, colIndex).Value) Then
            If sizes <> "" Then sizes = sizes & ","
            sizes = sizes & row.Range.Cells(1, colIndex).Value
        End If
    Next row
    
    GetSizesForType = sizes
End Function
