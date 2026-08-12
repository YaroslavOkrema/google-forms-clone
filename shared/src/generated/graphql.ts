import type { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  values: Array<Scalars['String']['output']>;
};

export type AnswerInput = {
  questionId: Scalars['ID']['input'];
  values: Array<Scalars['String']['input']>;
};

export type Form = {
  __typename?: 'Form';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  submitResponse: Response;
};

export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions: Array<QuestionInput>;
  title: Scalars['String']['input'];
};

export type MutationSubmitResponseArgs = {
  answers: Array<AnswerInput>;
  formId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  form?: Maybe<Form>;
  forms: Array<Form>;
  responses: Array<Response>;
};

export type QueryFormArgs = {
  id: Scalars['ID']['input'];
};

export type QueryResponsesArgs = {
  formId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  options: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: QuestionType;
};

export type QuestionInput = {
  options?: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = 'CHECKBOX',
  Date = 'DATE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  Text = 'TEXT',
}

export type Response = {
  __typename?: 'Response';
  answers: Array<Answer>;
  formId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Answer: ResolverTypeWrapper<Answer>;
  AnswerInput: AnswerInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Form: ResolverTypeWrapper<Form>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Question: ResolverTypeWrapper<Question>;
  QuestionInput: QuestionInput;
  QuestionType: QuestionType;
  Response: ResolverTypeWrapper<Response>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  AnswerInput: AnswerInput;
  Boolean: Scalars['Boolean']['output'];
  Form: Form;
  ID: Scalars['ID']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Question: Question;
  QuestionInput: QuestionInput;
  Response: Response;
  String: Scalars['String']['output'];
};

export type AnswerResolvers<
  ContextType = Record<PropertyKey, never>,
  ParentType extends ResolversParentTypes['Answer'] =
    ResolversParentTypes['Answer'],
> = {
  questionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type FormResolvers<
  ContextType = Record<PropertyKey, never>,
  ParentType extends ResolversParentTypes['Form'] =
    ResolversParentTypes['Form'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes['Question']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Record<PropertyKey, never>,
  ParentType extends ResolversParentTypes['Mutation'] =
    ResolversParentTypes['Mutation'],
> = {
  createForm?: Resolver<
    ResolversTypes['Form'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateFormArgs, 'questions' | 'title'>
  >;
  submitResponse?: Resolver<
    ResolversTypes['Response'],
    ParentType,
    ContextType,
    RequireFields<MutationSubmitResponseArgs, 'answers' | 'formId'>
  >;
};

export type QueryResolvers<
  ContextType = Record<PropertyKey, never>,
  ParentType extends ResolversParentTypes['Query'] =
    ResolversParentTypes['Query'],
> = {
  form?: Resolver<
    Maybe<ResolversTypes['Form']>,
    ParentType,
    ContextType,
    RequireFields<QueryFormArgs, 'id'>
  >;
  forms?: Resolver<Array<ResolversTypes['Form']>, ParentType, ContextType>;
  responses?: Resolver<
    Array<ResolversTypes['Response']>,
    ParentType,
    ContextType,
    RequireFields<QueryResponsesArgs, 'formId'>
  >;
};

export type QuestionResolvers<
  ContextType = Record<PropertyKey, never>,
  ParentType extends ResolversParentTypes['Question'] =
    ResolversParentTypes['Question'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['QuestionType'], ParentType, ContextType>;
};

export type ResponseResolvers<
  ContextType = Record<PropertyKey, never>,
  ParentType extends ResolversParentTypes['Response'] =
    ResolversParentTypes['Response'],
> = {
  answers?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType>;
  formId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Record<PropertyKey, never>> = {
  Answer?: AnswerResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
};
