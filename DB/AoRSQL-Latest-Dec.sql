--DROP Table [dbo].[AcknowledgementOfReceipt];
--DROP Table [dbo].[AcknowledgementOfReceiptSectionData];

--CREATE TABLE dbo.AcknowledgementOfReceipt
--(
--Id INT IDENTITY PRIMARY KEY,
--AoRTitle nvarchar(max),
--Code nvarchar(max),
--AliasName nvarchar(max) null,
--CreatedUTCDate datetime null,
--CreatedBy nvarchar(255) null,
--ModifiedUTCDate datetime null,
--ModifiedBy nvarchar(255) null
--)


--CREATE TABLE dbo.[AcknowledgementOfReceiptSectionData]
--(
--Id INT IDENTITY PRIMARY KEY,
--[AoRId] int,
--[Version] int,
--FormData XML,
--CreatedUTCDate datetime null,
--CreatedBy nvarchar(255) null,
--ModifiedUTCDate datetime null,
--ModifiedBy nvarchar(255) null
--)


--INSERT INTO [dbo].[AcknowledgementOfReceipt] ([AoRTitle], [Code], [CreatedUTCDate], [CreatedBy], [ModifiedUTCDate], [ModifiedBy]) VALUES('Global - Acknowledgement of Receipt of Instructions', '1001', GETDATE(), 'test', GETDATE(), 'test');


--INSERT INTO [AcknowledgementOfReceiptSectionData](AoRId, FormData, [Version])
--SELECT 1, CONVERT(XML, BulkColumn) AS BulkColumn, 1
--FROM OPENROWSET(BULK 'C:\Users\vijay\OneDrive\Desktop\OpenXMLTesting.xml', SINGLE_BLOB) AS x;

--SELECT * FROM dbo.[AcknowledgementOfReceipt];
--SELECT * FROM dbo.[AcknowledgementOfReceiptSectionData];

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


ALTER TABLE [dbo].[S_TemplateParent] ADD CONSTRAINT [FK_S_TemplateParent_TemplateType_Id] FOREIGN KEY ([TemplateTypeId]) REFERENCES [dbo].[S_TemplateType]([Id]);
ALTER TABLE [dbo].[S_TemplateVersion] ADD CONSTRAINT [FK_S_TemplateVersion_TemplateParent_Id] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[S_TemplateParent]([Id]);
ALTER TABLE [dbo].[S_TemplateField] ADD CONSTRAINT [FK_S_TemplateField_TemplateSection_Id] FOREIGN KEY ([TemplateSectionId]) REFERENCES [dbo].[S_TemplateSection]([Id]);
ALTER TABLE [dbo].[S_TemplateSection] ADD CONSTRAINT [FK_S_TemplateSection_TemplatePanel_Id] FOREIGN KEY ([TemplatePanelId]) REFERENCES [dbo].[S_TemplatePanel]([Id]);
ALTER TABLE [dbo].[S_TemplatePanel] ADD CONSTRAINT [FK_S_TemplatePanel_TemplateVersion_Id] FOREIGN KEY ([TemplateVersionId]) REFERENCES [dbo].[S_TemplateVersion]([Id]);


--Insert TemplateType table
INSERT INTO [dbo].[S_TemplateType] ([Code], [Description]) VALUES('MoWP', 'Memorandum Of Work Performed.');
INSERT INTO [dbo].[S_TemplateType] ([Code], [Description]) VALUES('AoR', 'Acknowledgement Of Receipt.');
INSERT INTO [dbo].[S_TemplateType] ([Code], [Description]) VALUES('Confirmation', 'Confirmation.');


--Insert TempalteParent table
INSERT INTO [dbo].[S_TemplateParent] ([Title], [TemplateTypeId], [Code], [AliasName], [CreatedUTCDate], [CreatedBy], [ModifiedUTCDate], [ModifiedBy]) SELECT [AorTitle], 2, [Code], [AliasName], [CreatedUTCDate], [CreatedBy], [ModifiedUTCDate], [ModifiedBy] FROM [dbo].[AcknowledgementOfReceipt];


DECLARE @Counter INT , @MaxId INT
SELECT @Counter = min(Id) , @MaxId = max(Id) FROM dbo.AcknowledgementOfReceiptSectionData;

WHILE(@Counter IS NOT NULL AND @Counter <= @MaxId)
BEGIN

DECLARE @templateVersionId int;
DECLARE @templatePanelId int;
DECLARE @templateSectionId int;

--Insert TemplateVersion table
INSERT INTO [dbo].[S_TemplateVersion] ([TemplateId], [Version], [Status], [Description],  CreatedUTCDate, CreatedBy, ModifiedUTCDate, ModifiedBy)
SELECT [AoRId], [Version], 1, '', CreatedUTCDate, CreatedBy, ModifiedUTCDate, ModifiedBy from dbo.AcknowledgementOfReceiptSectionData WHERE Id = @Counter;

SET @templateVersionId = SCOPE_IDENTITY()

-- Insert TemplatePanel Records
INSERT INTO [dbo].[S_TemplatePanel] ([TemplateVersionId], [Name]) Values(@templateVersionId, 'AoR');
SET @templatePanelId = SCOPE_IDENTITY()

-- Insert TempalteSection Records
INSERT INTO [dbo].[S_TemplateSection] ([TemplatePanelId], [SectionName], [ShowHeader]) Values (@templatePanelId, 'Details', 0);
SET @templateSectionId = SCOPE_IDENTITY()




DECLARE @XML AS XML, @hDoc AS INT, @SQL NVARCHAR (MAX)

SELECT @XML = [FormData] FROM [dbo].[AcknowledgementOfReceiptSectionData]  WHERE Id = @Counter; 

EXEC sp_xml_preparedocument @hDoc OUTPUT, @XML


-- Insert TemplateField Records
INSERT INTO [dbo].[S_TemplateField]
           ([TemplateSectionId], [inputtype], [code], [label])
		   SELECT @templateSectionId, 'INPUT', [Code], [Description] value FROM OPENXML(@hDoc, 'AorFormData/Labels/@*')  WITH ([Code] VARCHAR(max) '@mp:localname', [Description] VARCHAR(max) '.')


EXEC sp_xml_removedocument @hDoc



SET @Counter  = @Counter  + 1        
END


SELECT * FROM [dbo].[S_TemplateParent];
SELECT * FROM [dbo].[S_TemplateVersion];
SELECT * FROM [dbo].[S_TemplatePanel];
SELECT * FROM [dbo].[S_TemplateSection];
SELECT * FROM [dbo].[S_TemplateField];