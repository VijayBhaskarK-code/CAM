--DROP Table [dbo].[MOWPTemplateVersions];
--DROP Table [dbo].[MemorandumOfWorkPerformed];

--CREATE TABLE MemorandumOfWorkPerformed
--(
--Id INT IDENTITY PRIMARY KEY,
--Title nvarchar(max),
--CreatedUTCDate datetime null,
--CreatedBy nvarchar(255) null,
--ModifiedUTCDate datetime null,
--ModifiedBy nvarchar(255) null
--)


--CREATE TABLE MOWPTemplateVersions
--(
--Id INT IDENTITY PRIMARY KEY,
--[MowpTempId] int,
--[Version] int,
--FormTemplate nvarchar(max),
--CreatedUTCDate datetime null,
--CreatedBy nvarchar(255) null,
--ModifiedUTCDate datetime null,
--ModifiedBy nvarchar(255) null
--)


--INSERT INTO [dbo].[MemorandumOfWorkPerformed] ([Title], [CreatedUTCDate], [CreatedBy], [ModifiedUTCDate], [ModifiedBy]) VALUES('Year-End-US PCAOB-MoWP - US(PCAOB)', GETDATE(), 'test', GETDATE(), 'test');
--INSERT INTO [dbo].[MemorandumOfWorkPerformed] ([Title], [CreatedUTCDate], [CreatedBy], [ModifiedUTCDate], [ModifiedBy]) VALUES('Interim-US PCAOB-MoWP - US(PCAOB)', GETDATE(), 'test', GETDATE(), 'test');






DROP Table [dbo].[S_TemplateField];
DROP Table [dbo].[S_TemplateSection];
DROP Table [dbo].[S_TemplatePanel];
DROP Table [dbo].[S_TemplateVersion];
DROP Table [dbo].[S_TemplateParent];
DROP Table [dbo].[S_TemplateType];



--Create TempalteType table
CREATE TABLE [dbo].[S_TemplateType] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[Code] nvarchar(max) NOT NULL,
	[Description] nvarchar(max) NOT NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);



--Create TempalteParent table
CREATE TABLE [dbo].[S_TemplateParent] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[Title] nvarchar(max) NOT NULL,
	[Code] nvarchar(max) NULL,
	[AliasName] nvarchar(max) NULL,
	[TemplateTypeId] int NOT NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);



--Create TempalteVersion table
CREATE TABLE [dbo].[S_TemplateVersion] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[TemplateId] int NOT NULL,
	[Version] nvarchar(max) NOT NULL,
	[Status] int NULL,
	[Caption] nvarchar(max) NULL,
	[Description] nvarchar(max) NULL,
	[PublishedUtcDate] datetime NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);



--Create TempaltePanel table
CREATE TABLE [dbo].[S_TemplatePanel] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[Name] nvarchar(max) NULL,
	[HintName] nvarchar(max) NULL,
	[TemplateVersionId] int NOT NULL,
	[Order] int NULL,
	[Row] int NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);



--Create TempalteSection table
CREATE TABLE [dbo].[S_TemplateSection] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[TemplatePanelId] int NOT NULL,
	[SectionName] nvarchar(max) NOT NULL,
	[ArrayName] nvarchar(max) NULL,
	[Config] bit NULL,
	[ShowButton] bit NULL,
	[SectionHeader] nvarchar(max) NULL,
	[HintName] nvarchar(max) NULL,
	[ShowHeader] bit NULL,
	[HideHint] bit NULL,
	[Order] int NULL,
	[Row] int NULL,
	[ButtonLabel] nvarchar(max) NULL,
	[CTHeader] nvarchar(max) NULL,
	[OnCondition] nvarchar(max) NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);



--Create TempalteField table
CREATE TABLE [dbo].[S_TemplateField] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[TemplateSectionId] int NOT NULL,
	[ParentFieldId] int NULL,
	[Caption] nvarchar(max) NULL,
	[Code] nvarchar(max) NOT NULL,
	[InputType] nvarchar(max) NULL,
	[Label] nvarchar(max) NULL,
	[Validators] nvarchar(max) NULL,
	[Options] nvarchar(max) NULL,
	[ErrorMessages] nvarchar(max) NULL,
	[AsyncValidators] nvarchar(max) NULL,
	[Required] bit NULL,
	[RequiredOnSave] bit NULL,
	[Order] int NULL,
	[Row] int NULL,
	[PanelType] nvarchar(max) NULL,
	[Placeholder] nvarchar(max) NULL,
	[OutputType] nvarchar(max) NULL,
	[MaxLength] int NULL,
	[Inline] nvarchar(max) NULL,
	[List] nvarchar(max) NULL,
	[Suggestions] nvarchar(max) NULL,
	[Additional] nvarchar(max) NULL,
	[Multiple] bit NULL,
	[InitialCount] int NULL,
	[Group] nvarchar(max) NULL,
	[Hidden] bit NULL,
	[GroupPrototype] nvarchar(max) NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);

--Create TempalteParent table
CREATE TABLE [dbo].[S_TemplateSurvey] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[TemplateVersionId] int NOT NULL,
	[UserId] int NOT NULL,
	[Status] varchar(max) NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);


--Create TempalteParent table
CREATE TABLE [dbo].[S_TemplateSurveyResponse] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[TemplateSurveyId] int NOT NULL,
	[TemplateFieldId] int NOT NULL,
	[Response] varchar(max) NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);

--Create TempalteParent table
CREATE TABLE [dbo].[S_TemplateSurveyChildResponse] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[TemplateSurveyResponseId] int NOT NULL,
	[TemplateFieldId] int NOT NULL,
	[Response] varchar(max) NULL,
	[CreatedBy] nvarchar(max) NULL,
	[ModifiedBy] nvarchar(max) NULL,
	[CreatedUTCDate] datetime NULL,
	[ModifiedUTCDate] datetime NULL,
	PRIMARY KEY ([Id])
);





ALTER TABLE [dbo].[S_TemplateParent] ADD CONSTRAINT [FK_S_TemplateParent_TemplateType_Id] FOREIGN KEY ([TemplateTypeId]) REFERENCES [dbo].[S_TemplateType]([Id]);
ALTER TABLE [dbo].[S_TemplateVersion] ADD CONSTRAINT [FK_S_TemplateVersion_TemplateParent_Id] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[S_TemplateParent]([Id]);
ALTER TABLE [dbo].[S_TemplateField] ADD CONSTRAINT [FK_S_TemplateField_TemplateSection_Id] FOREIGN KEY ([TemplateSectionId]) REFERENCES [dbo].[S_TemplateSection]([Id]);
ALTER TABLE [dbo].[S_TemplateSection] ADD CONSTRAINT [FK_S_TemplateSection_TemplatePanel_Id] FOREIGN KEY ([TemplatePanelId]) REFERENCES [dbo].[S_TemplatePanel]([Id]);
ALTER TABLE [dbo].[S_TemplatePanel] ADD CONSTRAINT [FK_S_TemplatePanel_TemplateVersion_Id] FOREIGN KEY ([TemplateVersionId]) REFERENCES [dbo].[S_TemplateVersion]([Id]);
ALTER TABLE [dbo].[S_TemplateSurvey] ADD CONSTRAINT [FK_S_TemplateSurvey_TemplateVersion_Id] FOREIGN KEY ([TemplateVersionId]) REFERENCES [dbo].[S_TemplateVersion]([Id]);
ALTER TABLE [dbo].[S_TemplateSurveyResponse] ADD CONSTRAINT [FK_S_TemplateSurveyResponse_S_TemplateSurvey_Id] FOREIGN KEY ([TemplateSurveyId]) REFERENCES [dbo].[S_TemplateSurvey]([Id]);
ALTER TABLE [dbo].[S_TemplateSurveyResponse] ADD CONSTRAINT [FK_S_TemplateSurveyResponse_S_TemplateField_Id] FOREIGN KEY ([TemplateFieldId]) REFERENCES [dbo].[S_TemplateField]([Id]);
ALTER TABLE [dbo].[S_TemplateSurveyChildResponse] ADD CONSTRAINT [FK_S_TemplateSurveyChildResponse_S_TemplateSurveyResponse_Id] FOREIGN KEY ([TemplateSurveyResponseId]) REFERENCES [dbo].[S_TemplateSurveyResponse]([Id]);
ALTER TABLE [dbo].[S_TemplateSurveyChildResponse] ADD CONSTRAINT [FK_S_S_TemplateSurveyChildResponse_S_TemplateField_Id] FOREIGN KEY ([TemplateFieldId]) REFERENCES [dbo].[S_TemplateField]([Id]);


--Insert TemplateType table
INSERT INTO [dbo].[S_TemplateType] ([Code], [Description]) VALUES('MoWP', 'Memorandum Of Work Performed.');
INSERT INTO [dbo].[S_TemplateType] ([Code], [Description]) VALUES('AoR', 'Acknowledgement Of Receipt.');
INSERT INTO [dbo].[S_TemplateType] ([Code], [Description]) VALUES('Confirmation', 'Confirmation.');



--Insert TempalteParent table
INSERT INTO [dbo].[S_TemplateParent] ([Title], [TemplateTypeId], [CreatedUTCDate], [CreatedBy], [ModifiedUTCDate], [ModifiedBy]) SELECT [Title], 1, [CreatedUTCDate], [CreatedBy], [ModifiedUTCDate], [ModifiedBy] FROM [dbo].[MemorandumOfWorkPerformed];


DECLARE @Counter INT , @MaxId INT
SELECT @Counter = min(Id) , @MaxId = max(Id) FROM MOWPTemplateVersions;

WHILE(@Counter IS NOT NULL AND @Counter <= @MaxId)
BEGIN

DECLARE @templateVersionId int;

--Insert TemplateVersion table
INSERT INTO [dbo].[S_TemplateVersion] ([TemplateId], [Version], [Status], [Description],  CreatedUTCDate, CreatedBy, ModifiedUTCDate, ModifiedBy)
SELECT [MowpTempId], [Version], 1, '', CreatedUTCDate, CreatedBy, ModifiedUTCDate, ModifiedBy from MOWPTemplateVersions WHERE Id = @Counter;

SET @templateVersionId = SCOPE_IDENTITY()


DECLARE @json NVARCHAR(MAX);
(select @json = FormTemplate from [dbo].[MOWPTemplateVersions]  WHERE Id = @Counter);



-- Insert TemplatePanel Records
INSERT INTO [dbo].[S_TemplatePanel] ([TemplateVersionId], [Name], [HintName])
select @templateVersionId, Panels.PanelName, Panels.HintName from OPENJSON( @json,'$')
with (
PanelName nvarchar(max) N'$.name',
HintName nvarchar(max) N'$.HintName',
sections nvarchar(max) N'$.sections' as json
) as Panels;



-- Insert TempalteSection Records
INSERT INTO [dbo].[S_TemplateSection] ([TemplatePanelId], [SectionName], [SectionHeader], [HintName], [ArrayName], [ShowHeader], [Config], [ShowButton], [ButtonLabel], [CTHeader], [HideHint], [OnCondition])
select TPanel.[Id], Sections.[SectionName], Sections.[SectionHeader], Sections.[HintName], Sections.[ArrayName], Sections.[ShowHeader], Sections.[Config], Sections.[ShowButton], Sections.[ButtonLabel], Sections.[CTHeader], Sections.[hideHint], Sections.[showFormArraysOnCondition] from OPENJSON( @json,'$')
with (
PanelName nvarchar(max) N'$.name',
sections nvarchar(max) N'$.sections' as json
) as Panels
cross apply openjson (Panels.sections)
with (
sectionName nvarchar(max) N'$.sectionName',
sectionHeader nvarchar(max) N'$.sectionHeader',
HintName nvarchar(max) N'$.HintName',
arrayName nvarchar(max) N'$.arrayName',
showHeader nvarchar(max) N'$.showHeader',
config nvarchar(max) N'$.config',
showButton nvarchar(max) N'$.showButton',
buttonLabel nvarchar(max) N'$.buttonLabel',
CTHeader nvarchar(max) N'$.CTHeader',
hideHint nvarchar(max) N'$.hideHint',
showFormArraysOnCondition nvarchar(max) N'$.showFormArraysOnCondition' as json,
formFields nvarchar(max) N'$.formFields' as json
) as Sections
INNER JOIN [dbo].[S_TemplatePanel] TPanel ON TPanel.[Name] = Panels.PanelName
WHERE TPanel.TemplateVersionId = @templateVersionId;



-- Insert TemplateField Records
INSERT INTO [dbo].[S_TemplateField]
           ([TemplateSectionId], [inputtype], [code], [label], [required], [requiredOnSave], [panelType], [maxLength], [placeholder], [list], [suggestions], [multiple], [inline], [initialcount], 
[groupPrototype], [group], [additional], [options], [validators], [asyncValidators], [errorMessages])
select TSection.[Id], FormFields.[type], FormFields.[code], FormFields.[label], FormFields.[required], FormFields.[requiredOnSave], FormFields.[panelType], 
FormFields.[maxLength], FormFields.[placeholder], FormFields.[list], FormFields.[suggestions], FormFields.[multiple], FormFields.[inline], FormFields.[initialcount], 
FormFields.[groupPrototype], FormFields.[group], FormFields.[additional], FormFields.[options], FormFields.[validators], FormFields.[asyncValidators], 
FormFields.[errorMessages] from OPENJSON( @json,'$')
with (
PanelName nvarchar(max) N'$.name',
sections nvarchar(max) N'$.sections' as json
) as Panels
cross apply openjson (Panels.sections)
with (
sectionName nvarchar(max) N'$.sectionName',
formFields nvarchar(max) N'$.formFields' as json
) as Sections
cross apply openjson (Sections.formFields)
with (
type nvarchar(max) N'$.type',
code nvarchar(max) N'$.id',
label nvarchar(max) N'$.label',
required nvarchar(max) N'$.required',
requiredOnSave nvarchar(max) N'$.requiredOnSave',
panelType nvarchar(max) N'$.panelType',
maxLength nvarchar(max) N'$.maxLength',
placeholder nvarchar(max) N'$.placeholder',
list nvarchar(max) N'$.list'  as json,
suggestions nvarchar(max) N'$.suggestions'  as json,
multiple nvarchar(max) N'$.multiple',
inline nvarchar(max) N'$.inline',
initialcount nvarchar(max) N'$.initialcount',
groupPrototype nvarchar(max) N'$.groupPrototype' as json,
[group] nvarchar(max) N'$.group' as json,
additional nvarchar(max) N'$.additional' as json,
options nvarchar(max) N'$.options' as json,
validators nvarchar(max) N'$.validators' as json,
asyncValidators nvarchar(max) N'$.asyncValidators' as json,
errorMessages nvarchar(max) N'$.errorMessages' as json
) as FormFields
INNER JOIN [dbo].[S_TemplatePanel] TPanel ON TPanel.[Name] = Panels.PanelName
INNER JOIN [dbo].[S_TemplateSection] TSection ON TSection.[SectionName] = Sections.SectionName
WHERE TPanel.TemplateVersionId = @templateVersionId AND TSection.TemplatePanelId = TPanel.Id;



------ Insert GroupPrototype Field Records
INSERT INTO [dbo].[S_TemplateField]
           ([TemplateSectionId], [ParentFieldId], [inputtype], [code], [label], [required], [requiredOnSave], [panelType], [maxLength], [placeholder], [list], [suggestions], [multiple], [inline], [initialcount], 
[groupPrototype], [group], [additional], [options], [validators], [asyncValidators], [errorMessages], [Hidden])
select TSection.[Id], TField.[Id], GroupFormFields.[type], GroupFormFields.[code], GroupFormFields.[label], GroupFormFields.[required], GroupFormFields.[requiredOnSave], GroupFormFields.[panelType], 
GroupFormFields.[maxLength], GroupFormFields.[placeholder], GroupFormFields.[list], GroupFormFields.[suggestions], GroupFormFields.[multiple], GroupFormFields.[inline], GroupFormFields.[initialcount], 
GroupFormFields.[groupPrototype], GroupFormFields.[group], GroupFormFields.[additional], GroupFormFields.[options], GroupFormFields.[validators], GroupFormFields.[asyncValidators], 
GroupFormFields.[errorMessages], GroupFormFields.[hidden] from OPENJSON( @json,'$')
with (
PanelName nvarchar(max) N'$.name',
sections nvarchar(max) N'$.sections' as json
) as Panels
cross apply openjson (Panels.sections)
with (
sectionName nvarchar(max) N'$.sectionName',
formFields nvarchar(max) N'$.formFields' as json
) as Sections
cross apply openjson (Sections.formFields)
with (
code nvarchar(max) N'$.id',
groupPrototype nvarchar(max) N'$.groupPrototype' as json
) as FormFields
cross apply openjson (FormFields.groupPrototype)
with (
type nvarchar(max) N'$.type',
code nvarchar(max) N'$.id',
label nvarchar(max) N'$.label',
required nvarchar(max) N'$.required',
requiredOnSave nvarchar(max) N'$.requiredOnSave',
panelType nvarchar(max) N'$.panelType',
maxLength nvarchar(max) N'$.maxLength',
placeholder nvarchar(max) N'$.placeholder',
list nvarchar(max) N'$.list'  as json,
suggestions nvarchar(max) N'$.suggestions'  as json,
multiple nvarchar(max) N'$.multiple',
inline nvarchar(max) N'$.inline',
initialcount nvarchar(max) N'$.initialcount',
groupPrototype nvarchar(max) N'$.groupPrototype' as json,
[group] nvarchar(max) N'$.group' as json,
additional nvarchar(max) N'$.additional' as json,
[hidden] nvarchar(max) N'$.hidden',
options nvarchar(max) N'$.options' as json,
validators nvarchar(max) N'$.validators' as json,
asyncValidators nvarchar(max) N'$.asyncValidators' as json,
errorMessages nvarchar(max) N'$.errorMessages' as json
) as GroupFormFields
INNER JOIN [dbo].[S_TemplatePanel] TPanel ON TPanel.[Name] = Panels.PanelName
INNER JOIN [dbo].[S_TemplateSection] TSection ON TSection.[SectionName] = Sections.[SectionName]
INNER JOIN [dbo].[S_TemplateField] TField ON TField.[Code] = FormFields.[Code]
WHERE FormFields.groupPrototype is not null
AND TPanel.TemplateVersionId = @templateVersionId AND TSection.TemplatePanelId = TPanel.Id
AND TField.TemplateSectionId = TSection.Id AND TSection.TemplatePanelId = TPanel.Id;



---- Insert GroupPrototype's Group Field Records
INSERT INTO [dbo].[S_TemplateField]
           ([TemplateSectionId], [ParentFieldId], [inputtype], [code], [label], [required], [requiredOnSave], [panelType], [maxLength], [placeholder], [list], [suggestions], [multiple], [inline], [initialcount], 
[groupPrototype], [group], [additional], [options], [validators], [asyncValidators], [errorMessages])
select TSection.[Id], TField.[Id], GroupArrayFormFields.[type], GroupArrayFormFields.[code], GroupArrayFormFields.[label], GroupArrayFormFields.[required], GroupArrayFormFields.[requiredOnSave], GroupArrayFormFields.[panelType], 
GroupArrayFormFields.[maxLength], GroupArrayFormFields.[placeholder], GroupArrayFormFields.[list], GroupArrayFormFields.[suggestions], GroupArrayFormFields.[multiple], GroupArrayFormFields.[inline], GroupArrayFormFields.[initialcount], 
GroupArrayFormFields.[groupPrototype], GroupArrayFormFields.[group], GroupArrayFormFields.[additional], GroupArrayFormFields.[options], GroupArrayFormFields.[validators], GroupArrayFormFields.[asyncValidators], 
GroupArrayFormFields.[errorMessages] from OPENJSON( @json,'$')
with (
PanelName nvarchar(max) N'$.name',
sections nvarchar(max) N'$.sections' as json
) as Panels
cross apply openjson (Panels.sections)
with (
sectionName nvarchar(max) N'$.sectionName',
formFields nvarchar(max) N'$.formFields' as json
) as Sections
cross apply openjson (Sections.formFields)
with (
code nvarchar(max) N'$.id',
groupPrototype nvarchar(max) N'$.groupPrototype' as json
) as FormFields
cross apply openjson (FormFields.groupPrototype)
with (
code nvarchar(max) N'$.id',
[group] nvarchar(max) N'$.group' as json
) as GroupFormFields
cross apply openjson (GroupFormFields.[group])
with (
type nvarchar(max) N'$.type',
code nvarchar(max) N'$.id',
label nvarchar(max) N'$.label',
required nvarchar(max) N'$.required',
requiredOnSave nvarchar(max) N'$.requiredOnSave',
panelType nvarchar(max) N'$.panelType',
maxLength nvarchar(max) N'$.maxLength',
placeholder nvarchar(max) N'$.placeholder',
list nvarchar(max) N'$.list'  as json,
suggestions nvarchar(max) N'$.suggestions'  as json,
multiple nvarchar(max) N'$.multiple',
inline nvarchar(max) N'$.inline',
initialcount nvarchar(max) N'$.initialcount',
groupPrototype nvarchar(max) N'$.groupPrototype' as json,
[group] nvarchar(max) N'$.group' as json,
additional nvarchar(max) N'$.additional' as json,
options nvarchar(max) N'$.options' as json,
validators nvarchar(max) N'$.validators' as json,
asyncValidators nvarchar(max) N'$.asyncValidators' as json,
errorMessages nvarchar(max) N'$.errorMessages' as json
) as GroupArrayFormFields
INNER JOIN [dbo].[S_TemplatePanel] TPanel ON TPanel.[Name] = Panels.PanelName
INNER JOIN [dbo].[S_TemplateSection] TSection ON TSection.[SectionName] = Sections.[SectionName]
INNER JOIN [dbo].[S_TemplateField] TField ON TField.[Code] = GroupFormFields.[Code]
WHERE FormFields.groupPrototype is not null
AND TPanel.TemplateVersionId = @templateVersionId AND TSection.TemplatePanelId = TPanel.Id
AND TField.TemplateSectionId = TSection.Id AND TSection.TemplatePanelId = TPanel.Id;




----Insert Group Field Records
INSERT INTO [dbo].[S_TemplateField]
           ([TemplateSectionId], [ParentFieldId], [inputtype], [code], [label], [required], [requiredOnSave], [panelType], [maxLength], [placeholder], [list], [suggestions], [multiple], [inline], [initialcount], 
[groupPrototype], [group], [additional], [options], [validators], [asyncValidators], [errorMessages])
select TSection.[Id], TField.[Id], GroupFormFields.[type], GroupFormFields.[code], GroupFormFields.[label], GroupFormFields.[required], GroupFormFields.[requiredOnSave], GroupFormFields.[panelType], 
GroupFormFields.[maxLength], GroupFormFields.[placeholder], GroupFormFields.[list], GroupFormFields.[suggestions], GroupFormFields.[multiple], GroupFormFields.[inline], GroupFormFields.[initialcount], 
GroupFormFields.[groupPrototype], GroupFormFields.[group], GroupFormFields.[additional], GroupFormFields.[options], GroupFormFields.[validators], GroupFormFields.[asyncValidators], 
GroupFormFields.[errorMessages] from OPENJSON( @json,'$')
with (
PanelName nvarchar(max) N'$.name',
sections nvarchar(max) N'$.sections' as json
) as Panels
cross apply openjson (Panels.sections)
with (
sectionName nvarchar(max) N'$.sectionName',
formFields nvarchar(max) N'$.formFields' as json
) as Sections
cross apply openjson (Sections.formFields)
with (
code nvarchar(max) N'$.id',
[group] nvarchar(max) N'$.group' as json
) as FormFields
cross apply openjson (FormFields.[group])
with (
type nvarchar(max) N'$.type',
code nvarchar(max) N'$.id',
label nvarchar(max) N'$.label',
required nvarchar(max) N'$.required',
requiredOnSave nvarchar(max) N'$.requiredOnSave',
panelType nvarchar(max) N'$.panelType',
maxLength nvarchar(max) N'$.maxLength',
placeholder nvarchar(max) N'$.placeholder',
list nvarchar(max) N'$.list'  as json,
suggestions nvarchar(max) N'$.suggestions'  as json,
multiple nvarchar(max) N'$.multiple',
inline nvarchar(max) N'$.inline',
initialcount nvarchar(max) N'$.initialcount',
groupPrototype nvarchar(max) N'$.groupPrototype' as json,
[group] nvarchar(max) N'$.group' as json,
additional nvarchar(max) N'$.additional' as json,
options nvarchar(max) N'$.options' as json,
validators nvarchar(max) N'$.validators' as json,
asyncValidators nvarchar(max) N'$.asyncValidators' as json,
errorMessages nvarchar(max) N'$.errorMessages' as json
) as GroupFormFields
INNER JOIN [dbo].[S_TemplatePanel] TPanel ON TPanel.[Name] = Panels.PanelName
INNER JOIN [dbo].[S_TemplateSection] TSection ON TSection.[SectionName] = Sections.[SectionName]
INNER JOIN [dbo].[S_TemplateField] TField ON TField.[Code] = FormFields.[Code]
WHERE FormFields.[group] is not null
AND TPanel.TemplateVersionId = @templateVersionId AND TSection.TemplatePanelId = TPanel.Id
AND TField.TemplateSectionId = TSection.Id AND TSection.TemplatePanelId = TPanel.Id;


SET @Counter  = @Counter  + 1        
END


SELECT * FROM [dbo].[S_TemplateParent];
SELECT * FROM [dbo].[S_TemplateVersion];
SELECT * FROM [dbo].[S_TemplatePanel];
SELECT * FROM [dbo].[S_TemplateSection];
SELECT * FROM [dbo].[S_TemplateField];